import { MigrationInterface, QueryRunner } from 'typeorm';

export class TwitterAccessTokenAddedInUserEntity1709453213601
  implements MigrationInterface
{
  name = 'TwitterAccessTokenAddedInUserEntity1709453213601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "twitterAccessToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_50231f38688a079dc31f67399ad" UNIQUE ("twitterAccessToken")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_50231f38688a079dc31f67399ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "twitterAccessToken"`,
    );
  }
}
