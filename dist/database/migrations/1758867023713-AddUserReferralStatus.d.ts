import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddUserReferralStatus1758867023713 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
