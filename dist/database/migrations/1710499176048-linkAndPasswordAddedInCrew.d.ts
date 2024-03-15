import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class LinkAndPasswordAddedInCrew1710499176048 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
