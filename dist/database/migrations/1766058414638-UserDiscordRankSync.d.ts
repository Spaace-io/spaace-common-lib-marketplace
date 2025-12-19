import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UserDiscordRankSync1766058414638 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
