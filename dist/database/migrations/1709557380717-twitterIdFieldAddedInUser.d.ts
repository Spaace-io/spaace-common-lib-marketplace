import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TwitterIdFieldAddedInUser1709557380717 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
