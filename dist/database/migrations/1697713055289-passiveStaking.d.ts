import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class PassiveStaking1697713055289 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
