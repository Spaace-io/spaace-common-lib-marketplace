import { MigrationInterface, QueryRunner } from 'typeorm';

export class NumberOfLeaguesAddedInArenaDivision1710089840635
  implements MigrationInterface
{
  name = 'NumberOfLeaguesAddedInArenaDivision1710089840635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" RENAME COLUMN "leagueUserMaxCap" TO "numberOfLeagues"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" RENAME COLUMN "numberOfLeagues" TO "leagueUserMaxCap"`,
    );
  }
}
