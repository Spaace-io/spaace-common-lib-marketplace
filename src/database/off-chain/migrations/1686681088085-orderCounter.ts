import { MigrationInterface, QueryRunner } from 'typeorm';

export class orderCounter1686681088085 implements MigrationInterface {
  name = 'orderCounter1686681088085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "counter" numeric(78) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "counter"`);
  }
}
