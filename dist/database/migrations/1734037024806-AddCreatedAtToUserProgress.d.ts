import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddCreatedAtToUserProgress1734037024806 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
