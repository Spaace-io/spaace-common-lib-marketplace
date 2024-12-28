import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddBoostMultiplierToUserLoyalty1734629314225 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
