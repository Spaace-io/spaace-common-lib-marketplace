import { MigrationInterface, QueryRunner } from 'typeorm';

export class questDescription1690477138482 implements MigrationInterface {
  name = 'questDescription1690477138482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" ADD "description" text`);
    await queryRunner.query(`UPDATE "quests" SET "description" = "name"`);
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "description" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "description"`);
  }
}
