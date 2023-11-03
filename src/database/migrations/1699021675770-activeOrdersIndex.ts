import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActiveOrdersIndex1699021675770 implements MigrationInterface {
  name = 'ActiveOrdersIndex1699021675770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69f34fb128a167e9dd3eeada35"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf41fc975d409aa73fb34d2145"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_729615ba2ccd561e1c16766b2e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2434bfcac33f15ec25527d1e55"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2b7accfb6b654afdee73448fa8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3908b1f7583e4f4cb3b29f54b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4c29e58b1e24afe6a420eac12" ON "token_transfers" ("timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_949ca1a8640dba9fde696bc9ed" ON "transfers" ("collectionAddress", "tokenId", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_48ff10123de1f12ad97d9389ec" ON "transfers" ("to", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6ad30b2019d8c3c912e8ebcbad" ON "transfers" ("from", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6446d8f923c6a64337de94a4f" ON "transfers" ("timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41126261e9a22d2405c6ebde64" ON "staking_deposits" ("userAddress", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c866abee7aaf01b4f6a6d6f006" ON "staking_deposits" ("pool", "userAddress", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ada1107b0f23186413bec8efcf" ON "staking_harvests" ("pool", "token", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2549ba360e748e384808519f3" ON "staking_rewards" ("pool", "token", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b7195f977f51ee35c43cda5000" ON "token_balances" ("userAddress", "currency", "balance") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a4d4751963a565d8085df2759" ON "token_balances" ("currency", "balance") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f54ad337df477893cd474b5b7" ON "distributor_rewards" ("userAddress", "distributor", "amount") WHERE "harvestTimestamp" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12796feacc86a1415cb0828d0" ON "distributor_rewards" ("userAddress", "distributor", "amount") WHERE "harvestTimestamp" IS NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7e703d89736f55eee5b6fa68c2" ON "seasons" ("startTime") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ed3f26097caa408923b69e5ab2" ON "season_ranks" ("seasonNumber", "threshold") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70dee80d600300da49dd4d1e34" ON "user_loyalties" ("seasonNumber", "points") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ef2260573a9244e2eb7208341" ON "user_quest_progress" ("userAddress", "seasonNumber", "questId") WHERE "completed"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_dd8b4ee8d658dbbc0a9360f28b" ON "likes" ("userAddress", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ed45072a9e39ff1391ae246e1" ON "active_orders_cache" ("collectionAddress", "tokenId", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_119c6a5e12f2f9347445ab07a8" ON "active_orders_cache" ("collectionAddress", "tokenId", "price") WHERE "type" = 'BID' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7119911fb9fe2c7c51578ae1c1" ON "active_orders_cache" ("collectionAddress", "tokenId", "price") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d23cb3f7eb7a17a46f5c29e011" ON "active_orders_cache" ("collectionAddress", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2a4a3b0511ca729ab2d5d6f3d" ON "active_orders_cache" ("collectionAddress", "price") WHERE "type" = 'BID' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3a7c9cce7ff4a3f40880752c8e" ON "active_orders_cache" ("collectionAddress", "price") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3a7c9cce7ff4a3f40880752c8e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2a4a3b0511ca729ab2d5d6f3d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d23cb3f7eb7a17a46f5c29e011"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7119911fb9fe2c7c51578ae1c1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_119c6a5e12f2f9347445ab07a8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ed45072a9e39ff1391ae246e1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd8b4ee8d658dbbc0a9360f28b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ef2260573a9244e2eb7208341"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70dee80d600300da49dd4d1e34"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed3f26097caa408923b69e5ab2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7e703d89736f55eee5b6fa68c2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12796feacc86a1415cb0828d0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f54ad337df477893cd474b5b7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a4d4751963a565d8085df2759"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b7195f977f51ee35c43cda5000"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2549ba360e748e384808519f3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ada1107b0f23186413bec8efcf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c866abee7aaf01b4f6a6d6f006"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41126261e9a22d2405c6ebde64"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6446d8f923c6a64337de94a4f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6ad30b2019d8c3c912e8ebcbad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_48ff10123de1f12ad97d9389ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_949ca1a8640dba9fde696bc9ed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e4c29e58b1e24afe6a420eac12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3908b1f7583e4f4cb3b29f54b8" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE ((type = 'ENGLISH_AUCTION'::order_type) AND ("cancelTimestamp" IS NULL) AND (currency = ANY (ARRAY['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, 'b4fbf271143f4fbf7b91a5ded31805e42b2208d6'::bpchar])))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b7accfb6b654afdee73448fa8" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE ((type = 'BID'::order_type) AND ("cancelTimestamp" IS NULL) AND (currency = ANY (ARRAY['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, 'b4fbf271143f4fbf7b91a5ded31805e42b2208d6'::bpchar])))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2434bfcac33f15ec25527d1e55" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE ((type = ANY (ARRAY['ASK'::order_type, 'DUTCH_AUCTION'::order_type])) AND ("cancelTimestamp" IS NULL) AND (currency = ANY (ARRAY['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, 'b4fbf271143f4fbf7b91a5ded31805e42b2208d6'::bpchar])))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_729615ba2ccd561e1c16766b2e" ON "transfers" ("collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf41fc975d409aa73fb34d2145" ON "transfers" ("from", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69f34fb128a167e9dd3eeada35" ON "transfers" ("to", "collectionAddress", "tokenId") `,
    );
  }
}
