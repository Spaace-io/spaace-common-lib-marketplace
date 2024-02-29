import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaCronNameAddedInQuest1709207477686 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
