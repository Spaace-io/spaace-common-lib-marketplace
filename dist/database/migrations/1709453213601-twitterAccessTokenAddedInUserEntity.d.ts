import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TwitterAccessTokenAddedInUserEntity1709453213601 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
