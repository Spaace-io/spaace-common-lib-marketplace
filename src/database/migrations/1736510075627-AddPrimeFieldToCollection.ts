import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimeFieldToCollection1736510075627
  implements MigrationInterface
{
  name = 'AddPrimeFieldToCollection1736510075627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "collections"
      ADD COLUMN "prime" boolean DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "collections"
      DROP COLUMN "prime"
    `);
  }
}
