import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TimestampFieldsAdded1709111532933 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
