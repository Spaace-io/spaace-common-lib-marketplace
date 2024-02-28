import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefrenceQuestIdInArenaQuest1709136051268
  implements MigrationInterface
{
  name = 'RefrenceQuestIdInArenaQuest1709136051268';

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
