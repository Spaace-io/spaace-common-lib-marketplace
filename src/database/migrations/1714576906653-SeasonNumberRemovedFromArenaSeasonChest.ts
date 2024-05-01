import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeasonNumberRemovedFromArenaSeasonChest1714576906653
  implements MigrationInterface
{
  name = 'SeasonNumberRemovedFromArenaSeasonChest1714576906653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_738ad7df4a6908002d9789bcf14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_de046ac583e8be33d3b9f42f4a1" PRIMARY KEY ("divisionName", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP COLUMN "seasonNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD "seasonNumber" numeric(78,0) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_de046ac583e8be33d3b9f42f4a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_660d810ba4b5785318363c885e9" PRIMARY KEY ("seasonNumber", "divisionName", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "rank", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_738ad7df4a6908002d9789bcf14" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
