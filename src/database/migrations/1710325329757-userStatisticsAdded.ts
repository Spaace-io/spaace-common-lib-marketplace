import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserStatisticsAdded1710325329757 implements MigrationInterface {
  name = 'UserStatisticsAdded1710325329757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalReplies" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalQuotes" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalQuotes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReplies"`,
    );
  }
}
