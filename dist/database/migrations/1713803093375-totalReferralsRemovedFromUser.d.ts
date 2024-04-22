import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TotalReferralsRemovedFromUser1713803093375 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
