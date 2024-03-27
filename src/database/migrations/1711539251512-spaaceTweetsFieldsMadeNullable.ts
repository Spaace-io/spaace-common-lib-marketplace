import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpaaceTweetsFieldsMadeNullable1711539251512
  implements MigrationInterface
{
  name = 'SpaaceTweetsFieldsMadeNullable1711539251512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "postOfTheDay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "primePost"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "onboardingPost"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "likePaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "replyPaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "quotePaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "retweetPaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "likePaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "replyPaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "quotePaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "retweetPaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "postOfTheDay" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "primePost" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "onboardingPost" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "userTwitter" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b" PRIMARY KEY ("tweetId", "userTwitter")`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_type" RENAME TO "arena_quest_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW', 'ONBOARDING')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type" USING "type"::"text"::"public"."arena_quest_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type_old"`);
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type_old" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type_old" USING "type"::"text"::"public"."arena_quest_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_type_old" RENAME TO "arena_quest_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "onboardingPost"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "primePost"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "postOfTheDay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "retweetPaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "quotePaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "replyPaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "likePaginationToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "retweetPaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "quotePaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "replyPaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "likePaginationToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "onboardingPost" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "primePost" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "postOfTheDay" boolean NOT NULL DEFAULT false`,
    );
  }
}
