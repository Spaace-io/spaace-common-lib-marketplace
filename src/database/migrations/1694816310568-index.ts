import { MigrationInterface, QueryRunner } from 'typeorm';

export class Index1694816310568 implements MigrationInterface {
  name = 'Index1694816310568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_69f34fb128a167e9dd3eeada35" ON "transfers" ("to", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf41fc975d409aa73fb34d2145" ON "transfers" ("from", "collectionAddress", "tokenId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf41fc975d409aa73fb34d2145"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69f34fb128a167e9dd3eeada35"`,
    );
  }
}
