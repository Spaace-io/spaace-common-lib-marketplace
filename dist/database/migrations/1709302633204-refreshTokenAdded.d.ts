import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RefreshTokenAdded1709302633204 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
