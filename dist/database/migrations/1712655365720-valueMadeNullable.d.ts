import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ValueMadeNullable1712655365720 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
