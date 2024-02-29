import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RemoveReferenceQuestId1709189820020 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
