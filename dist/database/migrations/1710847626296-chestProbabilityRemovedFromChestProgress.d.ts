import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ChestProbabilityRemovedFromChestProgress1710847626296 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
