import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddModerationAudit1758893373320 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
