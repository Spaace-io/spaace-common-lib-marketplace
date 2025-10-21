import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompletionQuestProcessing1761055129484
  implements MigrationInterface
{
  name = 'AddCompletionQuestProcessing1761055129484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_processing" ADD "completedAt" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_processing" DROP COLUMN "completedAt"`,
    );
  }
}
