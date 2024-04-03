import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class QuoteCountAdded1712105892612 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
