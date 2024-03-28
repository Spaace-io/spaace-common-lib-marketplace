import { MigrationInterface, QueryRunner } from 'typeorm';

export class TwentyFourHourRankAddedInArenaUserProgress1711650145324
  implements MigrationInterface
{
  name = 'TwentyFourHourRankAddedInArenaUserProgress1711650145324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "crewStars"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "crewRank"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "twentyFourHourRank" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "twentyFourHourRank"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "crewRank" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "crewStars" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
  }
}
