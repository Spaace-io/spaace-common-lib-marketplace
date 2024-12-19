import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddCompletedAtTOUserQuestProgress1734428507472 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
