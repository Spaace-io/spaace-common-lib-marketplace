import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CrewRankAddedInUserProgress1711452743513 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
