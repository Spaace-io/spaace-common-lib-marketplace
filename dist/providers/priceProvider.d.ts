import { RedisClientType } from 'redis';
export interface PriceProviderConfig {
    coingecko: {
        apiKey: string;
        keyHeader?: string;
        baseUrl?: string;
    };
    redis: RedisClientType;
    cacheTTL?: number;
}
/**
 * Supported price pairs
 */
export declare enum PricePair {
    ETH_USD = "ETH-USD",
    WETH_USD = "WETH-USD"
}
export declare class PriceProvider {
    private readonly coingeckoClient;
    private readonly redis;
    private readonly cacheTTL;
    constructor(config: PriceProviderConfig);
    /**
     * Get price for a specific pair (e.g., ETH-USD)
     * Flow: Redis cache -> Coingecko API -> Database fallback
     */
    getPrice(pair: PricePair): Promise<number>;
    /**
     * Get ETH-USD price
     */
    getEthUsdPrice(): Promise<number>;
    /**
     * Convert Wei amount to USD
     * @param priceInWei - price in Wei (e.g., "1000000000000000000" = 1 ETH)
     * @param pair - price pair to use for conversion (default: ETH-USD)
     * @returns price in USD
     */
    convertWeiToUsd(priceInWei: string, pair?: PricePair): Promise<number>;
    /**
     * Clear cache for a specific price pair
     */
    clearCache(pair: PricePair): Promise<void>;
    /**
     * Try to get price from Redis cache
     */
    private getPriceFromCache;
    /**
     * Fetch price from Coingecko or DB and cache it
     */
    private fetchAndCachePrice;
    /**
     * Fetch price from Coingecko API
     */
    private fetchPriceFromCoingecko;
    /**
     * Fetch price from database
     */
    private fetchPriceFromDatabase;
    /**
     * Cache price in Redis
     */
    private cachePrice;
    /**
     * Get Redis cache key for a price pair
     */
    private getCacheKey;
}
