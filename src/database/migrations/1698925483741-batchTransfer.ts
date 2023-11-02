import { MigrationInterface, QueryRunner } from 'typeorm';

export class BatchTransfer1698925483741 implements MigrationInterface {
  name = 'BatchTransfer1698925483741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfers" ADD "batch" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transfers" DROP COLUMN "batch"`);
  }
}
