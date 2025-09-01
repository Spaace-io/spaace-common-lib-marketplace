import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddCurrencies1756725187890 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
