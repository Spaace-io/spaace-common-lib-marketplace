import { MigrationInterface, QueryRunner } from 'typeorm';

export class IdAddedInBoosterEntity1712932240803 implements MigrationInterface {
  name = 'IdAddedInBoosterEntity1712932240803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_2dfca3ef6097d491c1a7f23e6ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_25c80580f78016d01cae153c3e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_42fd7236d17ae0b82190e69d159" PRIMARY KEY ("seasonNumber", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ALTER COLUMN "seasonNumber" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_42fd7236d17ae0b82190e69d159"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_d33d583ef49900681a9e08ba229" PRIMARY KEY ("id")`,
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
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_d33d583ef49900681a9e08ba229"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_42fd7236d17ae0b82190e69d159" PRIMARY KEY ("seasonNumber", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ALTER COLUMN "seasonNumber" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_42fd7236d17ae0b82190e69d159"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_25c80580f78016d01cae153c3e4" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_2dfca3ef6097d491c1a7f23e6ab" PRIMARY KEY ("seasonNumber", "userTwitter")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP COLUMN "id"`,
    );
  }
}
