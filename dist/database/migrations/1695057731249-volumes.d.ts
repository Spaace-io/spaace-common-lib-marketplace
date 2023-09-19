import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Volumes1695057731249 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
