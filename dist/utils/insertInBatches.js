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
exports.insertInBatches = insertInBatches;
/**
 * Universal function for batch insert operations
 * Splits large datasets into smaller batches to avoid database limitations
 * and improve performance
 *
 * @param entity - TypeORM entity class that extends BaseEntity
 * @param data - Array of data to insert
 * @param batchSize - Size of each batch (default: 1000)
 * @param logger - Optional logger function for progress tracking
 *
 * @example
 * ```typescript
 * await insertInBatches(
 *   UserBadgeEntity,
 *   preparedUsers,
 *   1000,
 *   (msg) => console.log(msg)
 * );
 * ```
 */
function insertInBatches(entity_1, data_1) {
    return __awaiter(this, arguments, void 0, function* (entity, data, batchSize = 1000, logger) {
        if (!data.length) {
            logger === null || logger === void 0 ? void 0 : logger('No data to insert');
            return;
        }
        const totalBatches = Math.ceil(data.length / batchSize);
        logger === null || logger === void 0 ? void 0 : logger(`Inserting ${data.length} records in ${totalBatches} batches of ${batchSize}`);
        for (let i = 0; i < totalBatches; i++) {
            const start = i * batchSize;
            const end = start + batchSize;
            const batch = data.slice(start, end);
            try {
                // @ts-expect-error - TypeORM BaseEntity methods
                yield entity.insert(batch);
                logger === null || logger === void 0 ? void 0 : logger(`Batch ${i + 1}/${totalBatches} inserted (${batch.length} records)`);
            }
            catch (error) {
                const errorMessage = `Failed to insert batch ${i + 1}/${totalBatches}`;
                logger === null || logger === void 0 ? void 0 : logger(errorMessage);
                throw new Error(`${errorMessage}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        logger === null || logger === void 0 ? void 0 : logger(`Successfully inserted ${data.length} records`);
    });
}
//# sourceMappingURL=insertInBatches.js.map