import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ActiveOrdersCache1699016279498 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
