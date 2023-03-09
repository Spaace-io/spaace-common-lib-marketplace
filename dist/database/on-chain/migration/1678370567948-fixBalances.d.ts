import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class fixBalances1678370567948 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
