import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RankChangedToPrimaryColumnInArenaSeasonChest1710173654428 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
