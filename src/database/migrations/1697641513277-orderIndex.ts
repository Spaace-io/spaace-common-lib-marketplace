import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderIndex1697641513277 implements MigrationInterface {
  name = 'OrderIndex1697641513277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_8b6c737c16b17e9b2b2868e9e9" ON "orders" ("collectionAddress", "startTime") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b6c737c16b17e9b2b2868e9e9"`,
    );
  }
}
