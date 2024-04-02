import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class QuoteAndReplyAddedInArenaTweet1712055729212 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
