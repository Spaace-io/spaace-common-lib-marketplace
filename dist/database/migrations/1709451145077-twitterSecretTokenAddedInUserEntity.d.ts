import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TwitterSecretTokenAddedInUserEntity1709451145077 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
