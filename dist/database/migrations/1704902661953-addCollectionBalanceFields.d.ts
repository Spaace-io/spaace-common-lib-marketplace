import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddCollectionBalanceFields1704902661953 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
