import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeasonChaptersExtend1769783903473 implements MigrationInterface {
  name = 'SeasonChaptersExtend1769783903473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "season_chapters" ADD "preserveDiscordFloor" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_chapters" ADD "preserveReferralFloor" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "season_chapters" DROP COLUMN "preserveReferralFloor"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_chapters" DROP COLUMN "preserveDiscordFloor"`,
    );
  }
}
