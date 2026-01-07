import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpotlightCampaignMultiplier1767786060487
  implements MigrationInterface
{
  name = 'SpotlightCampaignMultiplier1767786060487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_runs"
      ADD COLUMN "multiplier" numeric(78,2) NOT NULL DEFAULT 2.0;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_runs"
      DROP COLUMN "multiplier";
    `);
  }
}
