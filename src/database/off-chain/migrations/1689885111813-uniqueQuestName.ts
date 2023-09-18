import { MigrationInterface, QueryRunner } from 'typeorm';

export class uniqueQuestName1689885111813 implements MigrationInterface {
  name = 'uniqueQuestName1689885111813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "UQ_4d91b52a8e3fe3ce2caac4a6139" UNIQUE ("seasonNumber", "name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "UQ_4d91b52a8e3fe3ce2caac4a6139"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
