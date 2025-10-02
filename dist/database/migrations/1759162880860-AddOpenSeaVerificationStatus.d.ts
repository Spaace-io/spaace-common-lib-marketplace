import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddOpenSeaVerificationStatus1759162880860 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
