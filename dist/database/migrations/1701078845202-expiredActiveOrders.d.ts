import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ExpiredActiveOrders1701078845202 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
