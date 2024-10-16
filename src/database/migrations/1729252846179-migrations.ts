import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729252846179 implements MigrationInterface {
  name = 'Migrations1729252846179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "email" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }
}
