import { MigrationInterface, QueryRunner } from 'typeorm';

export class deployedAt1671286608892 implements MigrationInterface {
  name = 'deployedAt1671286608892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" RENAME COLUMN "created_at" TO "deployedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "deployedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "deployedAt" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "deployedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "deployedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" RENAME COLUMN "deployedAt" TO "created_at"`,
    );
  }
}
