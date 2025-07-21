import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1751018416144 implements MigrationInterface {
  name = 'Migrations1751018416144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "order" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the added columns in reverse order
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "order"`);
  }
}
