import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class MergeDatabases1695136745634 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
