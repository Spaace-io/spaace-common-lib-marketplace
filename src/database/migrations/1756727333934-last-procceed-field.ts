import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastProcceedField1756727333934 implements MigrationInterface {
  name = 'AddLastProcceedField1756727333934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      ALTER TABLE user_quest_progress 
      ADD COLUMN "lastProcessedAt" TIMESTAMP NULL;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      ALTER TABLE user_quest_progress 
      DROP COLUMN "lastProcessedAt";
      `,
    );
  }
}
