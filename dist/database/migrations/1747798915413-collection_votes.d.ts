import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CollectionVotes1747798915413 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
