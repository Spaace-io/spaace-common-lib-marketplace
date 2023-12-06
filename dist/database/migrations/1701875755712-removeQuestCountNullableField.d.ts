import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RemoveQuestCountNullableField1701875755712 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
