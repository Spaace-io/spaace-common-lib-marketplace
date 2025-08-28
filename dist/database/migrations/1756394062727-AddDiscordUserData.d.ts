import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddDiscordUserData1756394062727 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
