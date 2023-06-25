import { MigrationInterface, QueryRunner } from 'typeorm';

export class orderCurrency1687685523544 implements MigrationInterface {
  name = 'orderCurrency1687685523544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "currency" TYPE character(40)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "currency" TYPE character`,
    );
  }
}
