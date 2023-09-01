import { MigrationInterface, QueryRunner } from 'typeorm';

export class Index1693575492598 implements MigrationInterface {
  name = 'Index1693575492598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_737f403a0dc0349952989dff4b" ON "balances" ("collectionAddress", "tokenId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_737f403a0dc0349952989dff4b"`,
    );
  }
}
