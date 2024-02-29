import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveReferenceQuestId1709189820020 implements MigrationInterface {
  name = 'RemoveReferenceQuestId1709189820020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "referenceQuestId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "referenceQuestId" uuid`,
    );
  }
}
