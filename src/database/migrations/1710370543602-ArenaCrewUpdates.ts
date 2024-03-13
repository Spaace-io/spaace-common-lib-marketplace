import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCrewUpdates1710370543602 implements MigrationInterface {
  name = 'ArenaCrewUpdates1710370543602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_crews" ("name" text NOT NULL, "owner" text, "description" text, "discord" text, "banner" text, "profile" text, "totalMembers" numeric(78) NOT NULL DEFAULT '0', "totalStarsEarned" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "REL_6a10bdf74fc88e7df1b32251e0" UNIQUE ("owner"), CONSTRAINT "PK_53feb0270ffc58e7ed5f1f0ae46" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crews" ADD CONSTRAINT "FK_6a10bdf74fc88e7df1b32251e02" FOREIGN KEY ("owner") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crews" DROP CONSTRAINT "FK_6a10bdf74fc88e7df1b32251e02"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crews"`);
  }
}
