import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddOrderHashToUserQuestProgress1733429925790 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
