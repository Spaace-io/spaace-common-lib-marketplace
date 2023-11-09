import { MigrationInterface, QueryRunner } from 'typeorm';

export class LastRefresh1699531535483 implements MigrationInterface {
  name = 'LastRefresh1699531535483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_3d0844cdd46863d617cbba6297"`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ("pk" = TRUE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_3d0844cdd46863d617cbba6297" CHECK (pk)`,
    );
  }
}
