import { MigrationInterface, QueryRunner } from 'typeorm';

export class BioAddedInUser1713525094434 implements MigrationInterface {
  name = 'BioAddedInUser1713525094434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "twitterBio" text NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "twitterBio"`,
    );
  }
}
