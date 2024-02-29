import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CronParameterAddedinCron1709209021892 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
