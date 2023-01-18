import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBlock1670959023218 implements MigrationInterface {
  name = 'createBlock1670959023218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blocks" ("number" integer NOT NULL, "hash" character(64) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c0b8f5cedabb33e58a625f8a7e" PRIMARY KEY ("number"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "item" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "item" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "amount" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "amount" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "amount" SET DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "amount" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "amount" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "amount" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "item" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "item" TYPE numeric(78,0)`,
    );
    await queryRunner.query(`DROP TABLE "blocks"`);
  }
}
