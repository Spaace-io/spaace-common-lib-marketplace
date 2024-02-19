import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaUser1708337359691 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
