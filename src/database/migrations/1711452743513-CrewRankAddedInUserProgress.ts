import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrewRankAddedInUserProgress1711452743513
  implements MigrationInterface
{
  name = 'CrewRankAddedInUserProgress1711452743513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "crewStars" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "crewRank" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "crewRank"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "crewStars"`,
    );
  }
}
