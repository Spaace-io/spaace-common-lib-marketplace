import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProcessingField1758893373321 implements MigrationInterface {
  name = 'AddProcessingField1758893373321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      ALTER TABLE user_quest_progress 
      ADD COLUMN "isProcessing" BOOLEAN NULL;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      ALTER TABLE user_quest_progress 
      DROP COLUMN "isProcessing";
      `,
    );
  }
}
