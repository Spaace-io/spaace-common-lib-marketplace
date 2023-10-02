import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class OrderRoyalties1696270569512 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
