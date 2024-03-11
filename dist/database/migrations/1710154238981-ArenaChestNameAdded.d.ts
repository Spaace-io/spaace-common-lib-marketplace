import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaChestNameAdded1710154238981 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
