import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoostMultiplierToUserLoyalty1734629314225
  implements MigrationInterface
{
  name = 'AddBoostMultiplierToUserLoyalty1734629314225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_loyalties"
      ADD COLUMN "boostMultiplier" numeric(78, 2) DEFAULT '1.0'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_loyalties"
      DROP COLUMN "boostMultiplier"
    `);
  }
}
