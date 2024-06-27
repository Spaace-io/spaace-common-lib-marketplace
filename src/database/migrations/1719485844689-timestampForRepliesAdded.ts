import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimestampForRepliesAdded1719485844689
  implements MigrationInterface
{
  name = 'TimestampForRepliesAdded1719485844689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "referralCodeLastShared" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" ADD "repliesLastFetched" TIMESTAMP NOT NULL DEFAULT now()`,
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
      `ALTER TABLE "arena_tweet" DROP COLUMN "repliesLastFetched"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "referralCodeLastShared"`,
    );
  }
}
