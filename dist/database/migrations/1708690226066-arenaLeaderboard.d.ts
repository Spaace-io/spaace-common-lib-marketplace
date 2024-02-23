import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaLeaderboard1708690226066 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
