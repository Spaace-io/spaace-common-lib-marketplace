import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpdateUserLoyalty1720706012011 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
