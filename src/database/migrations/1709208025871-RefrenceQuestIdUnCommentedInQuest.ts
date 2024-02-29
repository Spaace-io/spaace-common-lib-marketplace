import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefrenceQuestIdUnCommentedInQuest1709208025871
  implements MigrationInterface
{
  name = 'RefrenceQuestIdUnCommentedInQuest1709208025871';

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
