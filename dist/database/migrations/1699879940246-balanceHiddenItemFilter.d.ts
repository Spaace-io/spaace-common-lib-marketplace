import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class BalanceHiddenItemFilter1699879940246 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
