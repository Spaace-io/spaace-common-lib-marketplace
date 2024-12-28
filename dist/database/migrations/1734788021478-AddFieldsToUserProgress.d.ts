import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFieldsToUserProgress1734788021478 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
