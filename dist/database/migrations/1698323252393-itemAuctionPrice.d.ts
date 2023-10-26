import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ItemAuctionPrice1698323252393 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
