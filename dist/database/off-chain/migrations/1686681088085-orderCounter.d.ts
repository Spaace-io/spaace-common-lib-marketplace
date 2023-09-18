import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class orderCounter1686681088085 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
