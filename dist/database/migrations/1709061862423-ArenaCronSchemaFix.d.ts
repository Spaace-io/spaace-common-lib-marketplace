import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaCronSchemaFix1709061862423 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
