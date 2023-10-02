import { MigrationInterface, QueryRunner } from 'typeorm';

export class auctions1691656623660 implements MigrationInterface {
  name = 'auctions1691656623660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_type" AS ENUM('Ask', 'Bid', 'EnglishAuction', 'DutchAuction')`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "type" "public"."order_type"`,
    );
    await queryRunner.query(
      `UPDATE "orders" SET "type" = (case "isAsk" when true then 'Ask' else 'Bid' end)::"order_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "type" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "isAsk"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "startingPrice" numeric(78)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "startingPrice"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "isAsk" boolean`);
    await queryRunner.query(`UPDATE "orders" SET "isAsk" = "type" != 'Bid'`);
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "isAsk" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."order_type"`);
  }
}
