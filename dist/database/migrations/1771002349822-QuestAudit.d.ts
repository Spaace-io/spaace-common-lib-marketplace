import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class QuestAudit1771002349822 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
