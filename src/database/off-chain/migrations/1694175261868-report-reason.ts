import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReportReason1694175261868 implements MigrationInterface {
  name = 'ReportReason1694175261868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."report_reason" AS ENUM('FAKE', 'EXPLICIT', 'SPAM', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reports" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "reason" "public"."report_reason" NOT NULL, CONSTRAINT "PK_66592117509d55235181645b336" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reports"`);
    await queryRunner.query(`DROP TYPE "public"."report_reason"`);
  }
}
