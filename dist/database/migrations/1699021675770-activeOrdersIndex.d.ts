import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ActiveOrdersIndex1699021675770 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
