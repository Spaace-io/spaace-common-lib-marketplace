import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CollectionBalance1701216220837 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
