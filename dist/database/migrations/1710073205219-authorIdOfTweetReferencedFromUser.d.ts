import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AuthorIdOfTweetReferencedFromUser1710073205219 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
