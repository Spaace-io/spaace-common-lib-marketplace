"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceProvider = exports.PricePair = void 0;
const axios_1 = require("axios");
const utils_1 = require("ethers/lib/utils");
/**
 * Supported price pairs
 */
var PricePair;
(function (PricePair) {
    PricePair["ETH_USD"] = "ETH-USD";
    PricePair["WETH_USD"] = "WETH-USD";
})(PricePair || (exports.PricePair = PricePair = {}));
/**
 * Mapping between price pairs and Coingecko coin IDs
 */
const COINGECKO_COIN_MAP = {
    [PricePair.ETH_USD]: 'ethereum',
    [PricePair.WETH_USD]: 'weth',
};
/**
 * Mapping between price pairs and database symbols
 */
const DB_SYMBOL_MAP = {
    [PricePair.ETH_USD]: 'ETH',
    [PricePair.WETH_USD]: 'WETH',
};
// Prevent parallel fetch requests
const fetchPromises = new Map();
class PriceProvider {
    constructor(config) {
        const baseUrl = config.coingecko.baseUrl || 'https://pro-api.coingecko.com/api/v3';
        const keyHeader = config.coingecko.keyHeader || 'x-cg-pro-api-key';
        this.coingeckoClient = axios_1.default.create({
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
    getPrice(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const cacheKey = this.getCacheKey(pair);
            const cached = yield this.redis.get(cacheKey);
            const priceData = cached ? JSON.parse(cached) : {};
            const expiresAt = ((_a = priceData.timestamp) !== null && _a !== void 0 ? _a : 0) + this.cacheTTL * 1000;
            // If cache is invalid or expired, fetch new price
            if (!priceData.price || expiresAt < Date.now()) {
                if (!fetchPromises.has(pair)) {
                    fetchPromises.set(pair, this.fetchAndCachePrice(pair));
                }
                const fetchedPrice = yield fetchPromises.get(pair);
                fetchPromises.delete(pair);
                if (fetchedPrice !== null) {
                    priceData.price = fetchedPrice;
                }
            }
            if (!priceData.price) {
                throw new Error(`Failed to fetch ${pair} price from all sources`);
            }
            return priceData.price;
        });
    }
    /**
     * Get ETH-USD price
     */
    getEthUsdPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getPrice(PricePair.ETH_USD);
        });
    }
    /**
     * Convert Wei amount to USD
     * @param priceInWei - price in Wei (e.g., "1000000000000000000" = 1 ETH)
     * @param pair - price pair to use for conversion (default: ETH-USD)
     * @returns price in USD
     */
    convertWeiToUsd(priceInWei_1) {
        return __awaiter(this, arguments, void 0, function* (priceInWei, pair = PricePair.ETH_USD) {
            const usdPrice = yield this.getPrice(pair);
            const ethAmount = parseFloat((0, utils_1.formatEther)(priceInWei));
            return usdPrice * ethAmount;
        });
    }
    /**
     * Clear cache for a specific price pair
     */
    clearCache(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = this.getCacheKey(pair);
            try {
                yield this.redis.del(cacheKey);
            }
            catch (error) {
                console.warn(`Redis delete error for ${pair}:`, error);
            }
        });
    }
    // ==================== Private Methods ====================
    /**
     * Try to get price from Redis cache
     */
    getPriceFromCache(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const cacheKey = this.getCacheKey(pair);
            try {
                const cached = yield this.redis.get(cacheKey);
                if (!cached)
                    return null;
                const priceData = JSON.parse(cached);
                const expiresAt = ((_a = priceData.timestamp) !== null && _a !== void 0 ? _a : 0) + this.cacheTTL * 1000;
                if (priceData.price && expiresAt >= Date.now()) {
                    return priceData.price;
                }
                return null;
            }
            catch (error) {
                console.warn(`Redis get error for ${pair}:`, error);
                return null;
            }
        });
    }
    /**
     * Fetch price from Coingecko or DB and cache it
     */
    fetchAndCachePrice(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Try Coingecko first
            try {
                const price = yield this.fetchPriceFromCoingecko(pair);
                yield this.cachePrice(pair, price);
                return price;
            }
            catch (error) {
                const status = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
                const body = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data;
                console.warn(`Coingecko ${pair} failed: status=${status} body=${JSON.stringify(body)}. Trying database...`);
            }
            // Fallback to database
            try {
                const price = yield this.fetchPriceFromDatabase(pair);
                if (price !== null) {
                    yield this.cachePrice(pair, price);
                    return price;
                }
            }
            catch (error) {
                console.error(`Database ${pair} fetch failed:`, error);
            }
            return null;
        });
    }
    /**
     * Fetch price from Coingecko API
     */
    fetchPriceFromCoingecko(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const coinId = COINGECKO_COIN_MAP[pair];
            const { data } = yield this.coingeckoClient.get(`/simple/price?ids=${coinId}&vs_currencies=usd`);
            const price = Number((_a = data === null || data === void 0 ? void 0 : data[coinId]) === null || _a === void 0 ? void 0 : _a.usd);
            if (!Number.isFinite(price)) {
                throw new Error(`Invalid ${pair} price from Coingecko`);
            }
            return price;
        });
    }
    /**
     * Fetch price from database
     */
    fetchPriceFromDatabase(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const { TokenPriceEntity } = yield Promise.resolve().then(() => require('../database/tables'));
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
            const rows = yield TokenPriceEntity.query(sql, [
                symbol,
                'USD',
            ]);
            if (!rows.length) {
                return null;
            }
            const price = Number(rows[0].price);
            return Number.isFinite(price) ? price : null;
        });
    }
    /**
     * Cache price in Redis
     */
    cachePrice(pair, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = this.getCacheKey(pair);
            try {
                yield this.redis.set(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    price,
                }));
            }
            catch (error) {
                console.warn(`Redis cache error for ${pair}:`, error);
            }
        });
    }
    /**
     * Get Redis cache key for a price pair
     */
    getCacheKey(pair) {
        return `price-${pair.toLowerCase()}`;
    }
}
exports.PriceProvider = PriceProvider;
//# sourceMappingURL=priceProvider.js.map