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
export async function insertInBatches<T extends BaseEntity>(
  entity: typeof BaseEntity & (new () => T),
  data: Partial<T>[],
  batchSize: number = 1000,
  logger?: (message: string) => void,
): Promise<void> {
  if (!data.length) {
    logger?.('No data to insert');
    return;
  }

  const totalBatches = Math.ceil(data.length / batchSize);
  logger?.(
    `Inserting ${data.length} records in ${totalBatches} batches of ${batchSize}`,
  );

  for (let i = 0; i < totalBatches; i++) {
    const start = i * batchSize;
    const end = start + batchSize;
    const batch = data.slice(start, end);

    try {
      // @ts-expect-error - TypeORM BaseEntity methods
      await entity.insert(batch);
      logger?.(
        `Batch ${i + 1}/${totalBatches} inserted (${batch.length} records)`,
      );
    } catch (error) {
      const errorMessage = `Failed to insert batch ${i + 1}/${totalBatches}`;
      logger?.(errorMessage);
      throw new Error(
        `${errorMessage}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  logger?.(`Successfully inserted ${data.length} records`);
}
