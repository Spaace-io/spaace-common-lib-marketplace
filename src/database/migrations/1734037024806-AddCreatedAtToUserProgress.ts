import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtToUserProgress1734037024806
  implements MigrationInterface
{
  name = 'AddCreatedAtToUserProgress1734037024806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now()
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "createdAt"
    `);
  }
}
