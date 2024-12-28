import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFeaturedToQuest1734630030492 implements MigrationInterface {
  name = 'AddFeaturedToQuest1734630030492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "quests"
      ADD COLUMN "featured" boolean DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "quests"
      DROP COLUMN "featured"
    `);
  }
}
