import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressIndex1695308526833 implements MigrationInterface {
  name = 'AddressIndex1695308526833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_46257216fc882148eebb6da0a1" ON "collection_rankings" ("address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_46257216fc882148eebb6da0a1"`,
    );
  }
}
