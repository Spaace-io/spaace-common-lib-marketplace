import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFulfillRemainingQuantities1719818241620 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
