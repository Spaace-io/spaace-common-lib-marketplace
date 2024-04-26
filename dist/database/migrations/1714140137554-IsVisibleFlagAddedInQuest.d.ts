import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class IsVisibleFlagAddedInQuest1714140137554 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
