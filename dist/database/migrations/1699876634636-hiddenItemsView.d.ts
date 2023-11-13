import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class HiddenItemsView1699876634636 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
