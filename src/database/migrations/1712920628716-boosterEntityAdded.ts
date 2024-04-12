import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoosterEntityAdded1712920628716 implements MigrationInterface {
  name = 'BoosterEntityAdded1712920628716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_users_booster" ("userTwitter" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "booster" numeric(78) NOT NULL DEFAULT '0', "expiresOn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2dfca3ef6097d491c1a7f23e6ab" PRIMARY KEY ("userTwitter", "seasonNumber"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_25c80580f78016d01cae153c3e4" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_25c80580f78016d01cae153c3e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_booster"`);
  }
}
