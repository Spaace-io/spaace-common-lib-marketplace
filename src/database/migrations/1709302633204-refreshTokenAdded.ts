import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshTokenAdded1709302633204 implements MigrationInterface {
  name = 'RefreshTokenAdded1709302633204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "twitterRefreshToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_b59fa299832f49b1743df66b57c" UNIQUE ("twitterRefreshToken")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_b59fa299832f49b1743df66b57c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "twitterRefreshToken"`,
    );
  }
}
