import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsToUserProgress1734788021478
  implements MigrationInterface
{
  name = 'AddFieldsToUserProgress1734788021478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "boostMultiplier" numeric(78, 2) DEFAULT '1.0',
      ADD COLUMN "points" numeric(78) DEFAULT '0'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "points",
      DROP COLUMN "boostMultiplier"
    `);
  }
}
