import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ReferralRewardClaims1764688943000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
