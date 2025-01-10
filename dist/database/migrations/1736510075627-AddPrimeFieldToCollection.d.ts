import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddPrimeFieldToCollection1736510075627 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
