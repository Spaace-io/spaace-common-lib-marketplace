import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddReferralVolumeConfig1770206312525 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
