import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class BalanceRarityScore1704712931922 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
