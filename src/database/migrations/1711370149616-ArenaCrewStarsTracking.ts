import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCrewStarsTracking1711370149616 implements MigrationInterface {
  name = 'ArenaCrewStarsTracking1711370149616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_crew_stars_tracking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crewName" text NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9367de0f2d3e97beb1ed72cf296" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD "twentyFourHourRank" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_stars_tracking" ADD CONSTRAINT "FK_58bcd278e1f4b72e0393d8e0d55" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_stars_tracking" DROP CONSTRAINT "FK_58bcd278e1f4b72e0393d8e0d55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP COLUMN "twentyFourHourRank"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_stars_tracking"`);
  }
}
