import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class NullFloorPrice1699463906829 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
