import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddQuestTypeToQuests1732293508607 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
