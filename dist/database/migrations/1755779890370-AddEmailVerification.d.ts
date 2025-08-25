import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddEmailVerification1755779890370 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
