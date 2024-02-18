import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class QuestCompleted1708176024762 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
