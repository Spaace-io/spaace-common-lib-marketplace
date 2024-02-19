import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddReferralCodeInArenaUser1708347976438 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
