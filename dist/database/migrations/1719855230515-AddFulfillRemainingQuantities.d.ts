import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFulfillRemainingQuantities1719855230515 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
