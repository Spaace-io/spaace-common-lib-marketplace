import { MigrationInterface, QueryRunner } from 'typeorm';

export class txHash1690470462891 implements MigrationInterface {
  name = 'txHash1690470462891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD "txHash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD "logIdx" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP CONSTRAINT "PK_41126261e9a22d2405c6ebde644"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD CONSTRAINT "PK_a9faf6c57ab8c33732fb50dfa2c" PRIMARY KEY ("txHash", "logIdx")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "cancelTxHash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "cancelLogIdx" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "cancelTimestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "logIdx" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "logIdx" TYPE numeric(78)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "logIdx" TYPE integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ALTER COLUMN "logIdx" TYPE integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "cancelTimestamp"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cancelLogIdx"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cancelTxHash"`);
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD CONSTRAINT "PK_0e702ca6f5217d2bad5e0db3371" PRIMARY KEY ("userAddress", "timestamp", "txHash")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD CONSTRAINT "PK_41126261e9a22d2405c6ebde644" PRIMARY KEY ("userAddress", "timestamp")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP COLUMN "logIdx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP COLUMN "txHash"`,
    );
  }
}
