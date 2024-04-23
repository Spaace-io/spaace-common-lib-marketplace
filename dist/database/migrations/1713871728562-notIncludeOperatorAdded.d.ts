import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class NotIncludeOperatorAdded1713871728562 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
