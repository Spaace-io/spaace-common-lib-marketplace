import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpotlightCampaign1765880636001 implements MigrationInterface {
  name = 'SpotlightCampaign1765880636001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "spotlight_campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "collectionAddress" character(40) NOT NULL, "collectionName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "validFrom" TIMESTAMP NOT NULL, "validTo" TIMESTAMP NOT NULL, "active" boolean NOT NULL DEFAULT true, "metadata" jsonb NOT NULL DEFAULT '[]'::jsonb, CONSTRAINT "PK_4960c8d6ac239bf96e89bfb49e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaigns" ADD CONSTRAINT "FK_ff784e2e128c7108ff3b7f8cd8f" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaigns" DROP CONSTRAINT "FK_ff784e2e128c7108ff3b7f8cd8f"`,
    );
    await queryRunner.query(`DROP TABLE "spotlight_campaigns"`);
  }
}
