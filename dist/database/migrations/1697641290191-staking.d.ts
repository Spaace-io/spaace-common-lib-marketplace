import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Staking1697641290191 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
