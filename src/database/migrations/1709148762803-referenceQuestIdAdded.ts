import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReferenceQuestIdAdded1709148762803 implements MigrationInterface {
  name = 'ReferenceQuestIdAdded1709148762803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "referenceQuestId" uuid`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "referenceQuestId"`,
    );
  }
}
