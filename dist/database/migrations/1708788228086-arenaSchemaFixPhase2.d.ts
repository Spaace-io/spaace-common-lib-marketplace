import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaSchemaFixPhase21708788228086 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
