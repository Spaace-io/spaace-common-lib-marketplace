import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCrewChestPointTypoFix1713703768993
  implements MigrationInterface
{
  name = 'ArenaCrewChestPointTypoFix1713703768993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_crew_chest_points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minRank" numeric(78) NOT NULL DEFAULT '0', "maxRank" numeric(78) NOT NULL DEFAULT '0', "tiers" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_d8279cff4cd34c04adcd6bf9ef7" UNIQUE ("minRank", "maxRank"), CONSTRAINT "PK_4ee6b76059733e2ce25ab2ac830" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_chest_points"`);
  }
}
