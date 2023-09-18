import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RenameCollectionToCollectionAddress1687247114729 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
