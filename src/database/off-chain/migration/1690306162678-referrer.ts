import { MigrationInterface, QueryRunner } from 'typeorm';

export class referrer1690306162678 implements MigrationInterface {
  name = 'referrer1690306162678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "referrerAddress" character(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727" FOREIGN KEY ("referrerAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "referrerAddress"`,
    );
  }
}
