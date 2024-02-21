import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaSchema1708518466618 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
