import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkAndImageAddedInQuest1711536171968
  implements MigrationInterface
{
  name = 'LinkAndImageAddedInQuest1711536171968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "link" text`);
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "image" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "link"`);
  }
}
