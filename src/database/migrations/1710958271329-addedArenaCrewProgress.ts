import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedArenaCrewProgress1710958271329 implements MigrationInterface {
  name = 'AddedArenaCrewProgress1710958271329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_crew_progress" ("crewName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "questCompleted" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_7d564ee5d1ab3a80bebee9368ef" PRIMARY KEY ("crewName", "seasonNumber"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD CONSTRAINT "FK_e210c66dc623cca1065d6c98eb4" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD CONSTRAINT "FK_2016c331f10d8c6d7f32125ab31" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP CONSTRAINT "FK_2016c331f10d8c6d7f32125ab31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP CONSTRAINT "FK_e210c66dc623cca1065d6c98eb4"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_progress"`);
  }
}
