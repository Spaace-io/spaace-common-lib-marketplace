import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class StakingRewards1697713973266 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
