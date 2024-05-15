import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ExcludeAddedOnSensitiveData1715773679254 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
