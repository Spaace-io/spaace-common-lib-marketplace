import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsAmbassadorUserField1758290154608 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
