import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAccessLevel1745835300868 implements MigrationInterface {
  name = 'UserAccessLevel1745835300868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."access_level" AS ENUM('LOCKED', 'INVITED', 'WHITELISTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "accessLevel" "public"."access_level" NOT NULL DEFAULT 'LOCKED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accessLevel"`);
    await queryRunner.query(`DROP TYPE "public"."access_level"`);
  }
}
