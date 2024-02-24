import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaSchemaFixPhase11708784745452 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
