import { MigrationInterface, QueryRunner } from 'typeorm';

export class questPeriod1689606865263 implements MigrationInterface {
  name = 'questPeriod1689606865263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "limit" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "limit" SET DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "limit" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "limit" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "limit" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "limit" TYPE numeric(78,0)`,
    );
  }
}
