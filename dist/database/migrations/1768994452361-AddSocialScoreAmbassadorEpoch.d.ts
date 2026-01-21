import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddSocialScoreAmbassadorEpoch1768994452361 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
