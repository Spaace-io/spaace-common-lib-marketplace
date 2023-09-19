import { MigrationInterface, QueryRunner } from 'typeorm';

export class rarityScoreFloat1678292482803 implements MigrationInterface {
  name = 'rarityScoreFloat1678292482803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "importItems"`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityScore"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD "rarityScore" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityScore"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD "rarityScore" numeric(19,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "importItems" boolean NOT NULL DEFAULT false`,
    );
  }
}
