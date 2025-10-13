import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserQuestProcessing1760365350460 implements MigrationInterface {
  name = 'AddUserQuestProcessing1760365350460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_quest_processing" ("userAddress" character(40) NOT NULL, "questId" uuid NOT NULL, "seasonNumber" text NOT NULL, "scopeKey" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7bf615f6329e7a275f1c1edcd8e" PRIMARY KEY ("userAddress", "questId", "seasonNumber", "scopeKey"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_quest_processing"`);
  }
}
