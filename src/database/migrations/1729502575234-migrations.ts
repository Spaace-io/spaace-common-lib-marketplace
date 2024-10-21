import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729502575234 implements MigrationInterface {
  name = 'Migrations1729502575234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "PK_9ea5d8ab28cb5bb9b7c09d6674c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "PK_ce4b762f4246205df79d7c0d29e" PRIMARY KEY ("hash", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1316a9334a23e5c5b1b180e32" ON "orders_items" ("hash", "collectionAddress") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ceaf9a1e2286ed3b7ac7b3e6a" ON "orders_items" ("hash") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ceaf9a1e2286ed3b7ac7b3e6a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1316a9334a23e5c5b1b180e32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "PK_ce4b762f4246205df79d7c0d29e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "PK_9ea5d8ab28cb5bb9b7c09d6674c" PRIMARY KEY ("hash", "tokenId")`,
    );
  }
}
