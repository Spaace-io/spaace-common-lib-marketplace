import { BaseEntity } from 'typeorm';
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
export declare function insertInBatches<T extends BaseEntity>(entity: typeof BaseEntity & (new () => T), data: Partial<T>[], batchSize?: number, logger?: (message: string) => void): Promise<void>;
