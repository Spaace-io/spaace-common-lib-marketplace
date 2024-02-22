import { MigrationInterface, QueryRunner } from 'typeorm';

export class PointsRenamedToStars1708600874992 implements MigrationInterface {
  name = 'PointsRenamedToStars1708600874992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" RENAME COLUMN "points" TO "stars"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" RENAME COLUMN "loyaltyPoints" TO "stars"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" RENAME COLUMN "stars" TO "loyaltyPoints"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" RENAME COLUMN "stars" TO "points"`,
    );
  }
}
