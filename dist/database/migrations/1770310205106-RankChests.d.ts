import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RankChests1770310205106 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
