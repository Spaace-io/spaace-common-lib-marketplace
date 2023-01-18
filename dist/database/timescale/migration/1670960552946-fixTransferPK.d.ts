import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class fixTransferPK1670960552946 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
