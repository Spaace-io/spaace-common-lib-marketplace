import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddAdminUserXPSource1761225404467 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
