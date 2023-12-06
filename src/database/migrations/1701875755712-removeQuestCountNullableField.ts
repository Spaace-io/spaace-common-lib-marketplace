import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveQuestCountNullableField1701875755712
  implements MigrationInterface
{
  name = 'RemoveQuestCountNullableField1701875755712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "count" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `UPDATE "quests" SET "count" = 1 WHERE "count" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "count" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "count" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "count" TYPE numeric(78,0)`,
    );
  }
}
