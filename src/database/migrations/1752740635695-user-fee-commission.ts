import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1752740635695 implements MigrationInterface {
  name = 'Migrations1752740635695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_fee_commission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character(40) NOT NULL, "day" character varying(10) NOT NULL, "accumulated" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_682ce5ae173d980b2390f0cfddb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users_fee_commission"`);
  }
}
