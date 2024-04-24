import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TweetLikePaginationTokenAdded1713957568629 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
