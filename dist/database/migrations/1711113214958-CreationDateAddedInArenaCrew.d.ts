import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreationDateAddedInArenaCrew1711113214958 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
