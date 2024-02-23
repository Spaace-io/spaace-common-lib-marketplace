import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaLeaderboard1708692739545 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
