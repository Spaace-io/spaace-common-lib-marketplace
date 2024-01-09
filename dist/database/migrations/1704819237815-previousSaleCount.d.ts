import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class PreviousSaleCount1704819237815 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
