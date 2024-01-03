import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RoyaltiesReceiver1704276623923 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
