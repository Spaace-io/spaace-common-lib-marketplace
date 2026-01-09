import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpotlightCampaignRunExtension1767972855815
  implements MigrationInterface
{
  name = 'SpotlightCampaignRunExtension1767972855815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaign_runs" ADD "seasonNumber" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaign_runs" ADD "collectionAddress" character(40) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaign_runs" DROP COLUMN "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaign_runs" DROP COLUMN "seasonNumber"`,
    );
  }
}
