import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CronParameterSeperatedInCron1709209796750 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
