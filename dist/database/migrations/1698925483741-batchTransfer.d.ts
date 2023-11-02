import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class BatchTransfer1698925483741 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
