import { MigrationInterface, QueryRunner } from 'typeorm';

export class WowChestSchemaAdded1712579435104 implements MigrationInterface {
  name = 'WowChestSchemaAdded1712579435104';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."arena_wow_chest_type" AS ENUM('XP', 'TOKEN', 'BOOSTER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_wow_chest_probability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."arena_wow_chest_type" NOT NULL, "value" numeric(78) NOT NULL DEFAULT '0', "probability" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_3343967b7e6f23a8908cad8cdb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_wow_chest_period" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP NOT NULL DEFAULT now(), "numberOfChest" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_dcbdc01eba32a92f4751543d688" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_claimed_wow_chest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitter" text NOT NULL, "chestPeriod" uuid NOT NULL, "type" text NOT NULL, "value" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38f29efec3d06710a103f5e43c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_5c3faf5ae66b3bc6767bc9ebed5" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_afb6b41c7961ff5a2850c8943cc" FOREIGN KEY ("chestPeriod") REFERENCES "arena_wow_chest_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_afb6b41c7961ff5a2850c8943cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_5c3faf5ae66b3bc6767bc9ebed5"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_claimed_wow_chest"`);
    await queryRunner.query(`DROP TABLE "arena_wow_chest_period"`);
    await queryRunner.query(`DROP TABLE "arena_wow_chest_probability"`);
    await queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type"`);
  }
}
