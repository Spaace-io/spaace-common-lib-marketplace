import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UniqueConstrainOnWowChestProbability1712585919782 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
