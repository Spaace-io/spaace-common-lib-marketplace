import { MigrationInterface, QueryRunner } from 'typeorm';

export class LikeReportNotNullableTokenId1694612294360
  implements MigrationInterface
{
  name = 'LikeReportNotNullableTokenId1694612294360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "UQ_66592117509d55235181645b336"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "UQ_66592117509d55235181645b336" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "UQ_66592117509d55235181645b336"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "UQ_66592117509d55235181645b336" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
  }
}
