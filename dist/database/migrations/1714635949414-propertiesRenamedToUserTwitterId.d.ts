import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class PropertiesRenamedToUserTwitterId1714635949414 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
