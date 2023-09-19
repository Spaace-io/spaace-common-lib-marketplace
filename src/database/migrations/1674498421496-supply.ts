import { MigrationInterface, QueryRunner } from 'typeorm';

export class supply1674498421496 implements MigrationInterface {
  name = 'supply1674498421496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarity"`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "totalSupply" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "ownerCount" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "rarityRanking" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "rarityScore" numeric(19)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityScore"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityRanking"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "ownerCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "totalSupply"`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "rarity" jsonb`);
  }
}
