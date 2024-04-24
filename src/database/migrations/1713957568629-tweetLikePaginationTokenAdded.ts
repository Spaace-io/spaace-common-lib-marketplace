import { MigrationInterface, QueryRunner } from 'typeorm';

export class TweetLikePaginationTokenAdded1713957568629
  implements MigrationInterface
{
  name = 'TweetLikePaginationTokenAdded1713957568629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_admins" ADD "tweetLikePaginationToken" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_admins" DROP COLUMN "tweetLikePaginationToken"`,
    );
  }
}
