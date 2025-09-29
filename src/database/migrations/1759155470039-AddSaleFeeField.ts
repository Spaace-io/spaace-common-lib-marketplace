import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaleFeeField1759155470039 implements MigrationInterface {
  name = 'AddSaleFeeField1759155470039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ADD "feeBreakdown" jsonb NOT NULL DEFAULT '[]'::jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "feeBreakdown"`);
  }
}
