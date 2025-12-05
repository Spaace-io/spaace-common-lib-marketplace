import axios, { AxiosInstance } from 'axios';
import { RedisClientType } from 'redis';
import { formatEther } from 'ethers/lib/utils';

export interface PriceProviderConfig {
  coingecko: {
    apiKey: string;
    keyHeader?: string;
    baseUrl?: string;
  };
  redis: RedisClientType;
  cacheTTL?: number; // seconds, default 60
}

/**
 * Supported price pairs
 */
export enum PricePair {
  ETH_USD = 'ETH-USD',
  WETH_USD = 'WETH-USD',
}

/**
 * Mapping between price pairs and Coingecko coin IDs
 */
const COINGECKO_COIN_MAP: Record<PricePair, string> = {
  [PricePair.ETH_USD]: 'ethereum',
  [PricePair.WETH_USD]: 'weth',
};

/**
 * Mapping between price pairs and database symbols
 */
const DB_SYMBOL_MAP: Record<PricePair, string> = {
  [PricePair.ETH_USD]: 'ETH',
  [PricePair.WETH_USD]: 'WETH',
};

// Prevent parallel fetch requests
const fetchPromises = new Map<PricePair, Promise<number | null>>();

export class PriceProvider {
  private readonly coingeckoClient: AxiosInstance;
  private readonly redis: RedisClientType;
  private readonly cacheTTL: number;

  constructor(config: PriceProviderConfig) {
    const baseUrl =
      config.coingecko.baseUrl || 'https://pro-api.coingecko.com/api/v3';
    const keyHeader = config.coingecko.keyHeader || 'x-cg-pro-api-key';

    this.coingeckoClient = axios.create({
      baseURL: baseUrl,
      headers: {
        [keyHeader]: config.coingecko.apiKey,
      },
      timeout: 8000,
    });

    this.redis = config.redis;
    this.cacheTTL = config.cacheTTL || 60;
  }

  /**
   * Get price for a specific pair (e.g., ETH-USD)
   * Flow: Redis cache -> Coingecko API -> Database fallback
   */
  async getPrice(pair: PricePair): Promise<number> {
    const cacheKey = this.getCacheKey(pair);
    const cached = await this.redis.get(cacheKey);

    const priceData = cached ? JSON.parse(cached) : {};
    const expiresAt = (priceData.timestamp ?? 0) + this.cacheTTL * 1000;

    // If cache is invalid or expired, fetch new price
    if (!priceData.price || expiresAt < Date.now()) {
      if (!fetchPromises.has(pair)) {
        fetchPromises.set(pair, this.fetchAndCachePrice(pair));
      }

      const fetchedPrice = await fetchPromises.get(pair)!;
      fetchPromises.delete(pair);

      if (fetchedPrice !== null) {
        priceData.price = fetchedPrice;
      }
    }

    if (!priceData.price) {
      throw new Error(`Failed to fetch ${pair} price from all sources`);
    }

    return priceData.price;
  }

  /**
   * Get ETH-USD price
   */
  async getEthUsdPrice(): Promise<number> {
    return this.getPrice(PricePair.ETH_USD);
  }

  /**
   * Convert Wei amount to USD
   * @param priceInWei - price in Wei (e.g., "1000000000000000000" = 1 ETH)
   * @param pair - price pair to use for conversion (default: ETH-USD)
   * @returns price in USD
   */
  async convertWeiToUsd(
    priceInWei: string,
    pair: PricePair = PricePair.ETH_USD,
  ): Promise<number> {
    const usdPrice = await this.getPrice(pair);
    const ethAmount = parseFloat(formatEther(priceInWei));
    return usdPrice * ethAmount;
  }

  /**
   * Clear cache for a specific price pair
   */
  async clearCache(pair: PricePair): Promise<void> {
    const cacheKey = this.getCacheKey(pair);
    try {
      await this.redis.del(cacheKey);
    } catch (error) {
      console.warn(`Redis delete error for ${pair}:`, error);
    }
  }

  // ==================== Private Methods ====================

  /**
   * Try to get price from Redis cache
   */
  private async getPriceFromCache(pair: PricePair): Promise<number | null> {
    const cacheKey = this.getCacheKey(pair);

    try {
      const cached = await this.redis.get(cacheKey);
      if (!cached) return null;

      const priceData = JSON.parse(cached);
      const expiresAt = (priceData.timestamp ?? 0) + this.cacheTTL * 1000;

      if (priceData.price && expiresAt >= Date.now()) {
        return priceData.price;
      }

      return null;
    } catch (error) {
      console.warn(`Redis get error for ${pair}:`, error);
      return null;
    }
  }

  /**
   * Fetch price from Coingecko or DB and cache it
   */
  private async fetchAndCachePrice(pair: PricePair): Promise<number | null> {
    // Try Coingecko first
    try {
      const price = await this.fetchPriceFromCoingecko(pair);
      await this.cachePrice(pair, price);
      return price;
    } catch (error: any) {
      const status = error?.response?.status;
      const body = error?.response?.data;
      console.warn(
        `Coingecko ${pair} failed: status=${status} body=${JSON.stringify(body)}. Trying database...`,
      );
    }

    // Fallback to database
    try {
      const price = await this.fetchPriceFromDatabase(pair);
      if (price !== null) {
        await this.cachePrice(pair, price);
        return price;
      }
    } catch (error) {
      console.error(`Database ${pair} fetch failed:`, error);
    }

    return null;
  }

  /**
   * Fetch price from Coingecko API
   */
  private async fetchPriceFromCoingecko(pair: PricePair): Promise<number> {
    const coinId = COINGECKO_COIN_MAP[pair];
    const { data } = await this.coingeckoClient.get(
      `/simple/price?ids=${coinId}&vs_currencies=usd`,
    );

    const price = Number(data?.[coinId]?.usd);
    if (!Number.isFinite(price)) {
      throw new Error(`Invalid ${pair} price from Coingecko`);
    }

    return price;
  }

  /**
   * Fetch price from database
   */
  private async fetchPriceFromDatabase(
    pair: PricePair,
  ): Promise<number | null> {
    const { TokenPriceEntity } = await import('../database/tables');
    const symbol = DB_SYMBOL_MAP[pair];

    const sql = `
      SELECT price
      FROM token_prices
      WHERE symbol = $1
        AND "vsCurrency" = $2
      ORDER BY
        "bucketedAt" DESC NULLS LAST,
        "fetchedAt" DESC NULLS LAST,
        id DESC
      LIMIT 1;
    `;

    const rows: Array<{ price: string }> = await TokenPriceEntity.query(sql, [
      symbol,
      'USD',
    ]);

    if (!rows.length) {
      return null;
    }

    const price = Number(rows[0].price);
    return Number.isFinite(price) ? price : null;
  }

  /**
   * Cache price in Redis
   */
  private async cachePrice(pair: PricePair, price: number): Promise<void> {
    const cacheKey = this.getCacheKey(pair);

    try {
      await this.redis.set(
        cacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          price,
        }),
      );
    } catch (error) {
      console.warn(`Redis cache error for ${pair}:`, error);
    }
  }

  /**
   * Get Redis cache key for a price pair
   */
  private getCacheKey(pair: PricePair): string {
    return `price-${pair.toLowerCase()}`;
  }
}
