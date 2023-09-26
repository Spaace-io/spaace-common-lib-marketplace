import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderIndex1695743619694 implements MigrationInterface {
  name = 'OrderIndex1695743619694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_f9f7fca055c5b1ace83d1fba2c" ON "orders" ("collectionAddress", "counter") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f092505b4c45a9dc82a7e855b5" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "cancelTimestamp" IS NULL AND "currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd92de5c964d496e88e82767fb" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE "type" = 'BID' AND "cancelTimestamp" IS NULL AND "currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31a5b538b5ab55425ed9b27f47" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "cancelTimestamp" IS NULL AND "currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31a5b538b5ab55425ed9b27f47"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd92de5c964d496e88e82767fb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f092505b4c45a9dc82a7e855b5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f9f7fca055c5b1ace83d1fba2c"`,
    );
  }
}
