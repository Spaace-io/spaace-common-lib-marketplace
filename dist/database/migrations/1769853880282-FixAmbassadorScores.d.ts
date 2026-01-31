import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class FixAmbassadorScores1769853880282 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
