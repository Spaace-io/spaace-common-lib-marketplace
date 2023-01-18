import { MigrationInterface, QueryRunner } from 'typeorm';

export class enumCollectionType1671284510656 implements MigrationInterface {
  name = 'enumCollectionType1671284510656';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" RENAME COLUMN "tokenType" TO "type"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."collection_type" AS ENUM('ERC721', 'ERC1155')`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "type" "public"."collection_type" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."collection_type"`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "type" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" RENAME COLUMN "type" TO "tokenType"`,
    );
  }
}
