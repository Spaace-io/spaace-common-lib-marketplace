import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TokenRemovedFromWowChest1713611987171 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
