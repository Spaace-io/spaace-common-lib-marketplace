import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshTokenRemoved1709386374787 implements MigrationInterface {
  name = 'RefreshTokenRemoved1709386374787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_b59fa299832f49b1743df66b57c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "twitterRefreshToken"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "twitterRefreshToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_b59fa299832f49b1743df66b57c" UNIQUE ("twitterRefreshToken")`,
    );
  }
}
