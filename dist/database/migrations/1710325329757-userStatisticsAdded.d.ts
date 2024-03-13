import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UserStatisticsAdded1710325329757 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
