import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddMaterializedViewForBlockedUsers1760694458979 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
