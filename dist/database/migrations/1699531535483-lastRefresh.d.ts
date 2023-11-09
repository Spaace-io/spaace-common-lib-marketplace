import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class LastRefresh1699531535483 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
