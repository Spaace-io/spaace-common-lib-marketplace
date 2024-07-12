import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpdateUserLoyalty1720767272775 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
