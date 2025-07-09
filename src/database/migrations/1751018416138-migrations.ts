import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1751018416138 implements MigrationInterface {
  name = 'Migrations1751018416138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "sharedAirdropOGImage" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "sharedAirdropOGImage"`,
    );
  }
}
