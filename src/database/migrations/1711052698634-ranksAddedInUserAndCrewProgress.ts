import { MigrationInterface, QueryRunner } from 'typeorm';

export class RanksAddedInUserAndCrewProgress1711052698634
  implements MigrationInterface
{
  name = 'RanksAddedInUserAndCrewProgress1711052698634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "rank" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "leagueRank" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD "rank" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP COLUMN "rank"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "leagueRank"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "rank"`,
    );
  }
}
