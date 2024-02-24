import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaSchemaFixPhase21708788228086 implements MigrationInterface {
  name = 'ArenaSchemaFixPhase21708788228086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" RENAME COLUMN "division" TO "divisionName"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "prime"`);
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "boost"`);
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "boostLimit"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_738ad7df4a6908002d9789bcf14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ALTER COLUMN "divisionName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ALTER COLUMN "divisionName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "boostLimit" numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "boost" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "prime" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" RENAME COLUMN "divisionName" TO "division"`,
    );
  }
}
