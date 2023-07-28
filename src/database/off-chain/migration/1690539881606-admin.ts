import { MigrationInterface, QueryRunner } from 'typeorm';

export class admin1690539881606 implements MigrationInterface {
  name = 'admin1690539881606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seasons" RENAME COLUMN "startDate" TO "startTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seasons" RENAME COLUMN "endDate" TO "endTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
    await queryRunner.query(
      `ALTER TABLE "seasons" RENAME COLUMN "endTime" TO "endDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seasons" RENAME COLUMN "startTime" TO "startDate"`,
    );
  }
}
