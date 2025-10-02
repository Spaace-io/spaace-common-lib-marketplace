import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddSaleFeeField1759155470039 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
