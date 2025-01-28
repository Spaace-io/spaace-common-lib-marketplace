import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddTwittterFieldsToUsers1734127015611 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
