import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrewQuestProgressAdded1711630789063 implements MigrationInterface {
  name = 'CrewQuestProgressAdded1711630789063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_crew_quest_progress" ("crewName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_179dc7274f205b891814dc784d2" PRIMARY KEY ("crewName", "seasonNumber", "questId", "nonce"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7fee30aff1fe8f6877383958a4" ON "arena_crew_quest_progress" ("crewName", "seasonNumber", "questId") WHERE "completed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_ac59388a0fc24654d00aeeeb03e" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_b662357f295888d181665193e68" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_fe42e6e6b5b8dc4358f63600478" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_fe42e6e6b5b8dc4358f63600478"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_b662357f295888d181665193e68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_ac59388a0fc24654d00aeeeb03e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7fee30aff1fe8f6877383958a4"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_quest_progress"`);
  }
}
