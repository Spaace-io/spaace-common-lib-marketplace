import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1735216286807 implements MigrationInterface {
  name = 'Migrations1735216286807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "twitterUsername" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "twitterId" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "twitterSecretToken" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "twitterAccessToken" text`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quest_type" AS ENUM('GENESIS', 'PRIME', 'DAILY', 'PROGRESSIVE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "questType" "public"."quest_type" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "featured" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "quests" ADD "tweetId" text`);
    await queryRunner.query(
      `CREATE TYPE "public"."tweet_action" AS ENUM('LIKE', 'REPLY', 'REPOST')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "tweetAction" "public"."tweet_action"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD "boostMultiplier" numeric(78,2) NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "orderHash" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "completedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "tweetId" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "boostMultiplier" numeric(78,2) NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "points" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "boostMultiplier"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "tweetId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "completedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "orderHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP COLUMN "boostMultiplier"`,
    );
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "tweetAction"`);
    await queryRunner.query(`DROP TYPE "public"."tweet_action"`);
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "tweetId"`);
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "featured"`);
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "questType"`);
    await queryRunner.query(`DROP TYPE "public"."quest_type"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "twitterAccessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "twitterSecretToken"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitterId"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "twitterUsername"`,
    );
  }
}
