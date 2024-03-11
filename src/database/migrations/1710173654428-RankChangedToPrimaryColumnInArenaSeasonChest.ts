import { MigrationInterface, QueryRunner } from 'typeorm';

export class RankChangedToPrimaryColumnInArenaSeasonChest1710173654428
  implements MigrationInterface
{
  name = 'RankChangedToPrimaryColumnInArenaSeasonChest1710173654428';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_660d810ba4b5785318363c885e9" PRIMARY KEY ("seasonNumber", "divisionName", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ALTER COLUMN "rank" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ALTER COLUMN "rank" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "rank", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`,
    );
  }
}
