import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TierEnumBugFix1713180360211 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
