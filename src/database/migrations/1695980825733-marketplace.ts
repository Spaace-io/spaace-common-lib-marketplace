import { MigrationInterface, QueryRunner } from 'typeorm';

export class marketplace1695980825733 implements MigrationInterface {
  name = 'marketplace1695980825733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."marketplace" AS ENUM('SPAACE', 'OPENSEA', 'BLUR')`,
    );

    await queryRunner.query(
      `ALTER TABLE "orders" ADD "marketplace" "public"."marketplace" NOT NULL DEFAULT 'SPAACE'::marketplace`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "marketplace" DROP DEFAULT`,
    );

    await queryRunner.query(
      `ALTER TABLE "sales" ADD "marketplace" "public"."marketplace"`,
    );
    await queryRunner.query(`
      UPDATE "sales" AS "sale" SET "marketplace" = COALESCE((SELECT "order"."marketplace" FROM "orders" AS "order" WHERE "order"."hash" = "sale"."orderHash"), 'OPENSEA'::marketplace)
    `);
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "marketplace" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "marketplace"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "marketplace"`);
    await queryRunner.query(`DROP TYPE "public"."marketplace"`);
  }
}
