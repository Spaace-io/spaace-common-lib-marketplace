import { MigrationInterface, QueryRunner } from 'typeorm';

export class orderEndTimeNullable1686684969379 implements MigrationInterface {
  name = 'orderEndTimeNullable1686684969379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "endTime" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "endTime" SET NOT NULL`,
    );
  }
}
