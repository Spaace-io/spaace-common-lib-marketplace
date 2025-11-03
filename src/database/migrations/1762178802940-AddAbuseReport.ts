import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAbuseReport1762178802940 implements MigrationInterface {
  name = 'AddAbuseReport1762178802940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users"
        ADD COLUMN "checkedAbuseReport" boolean DEFAULT false;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users"
        DROP COLUMN "checkedAbuseReport";
      `);
  }
}
