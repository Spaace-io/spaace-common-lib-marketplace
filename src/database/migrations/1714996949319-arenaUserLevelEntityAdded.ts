import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaUserLevelEntityAdded1714996949319
  implements MigrationInterface
{
  name = 'ArenaUserLevelEntityAdded1714996949319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_user_level_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitterId" text NOT NULL, "oldLevel" numeric(78) NOT NULL DEFAULT '0', "newLevel" numeric(78) NOT NULL DEFAULT '0', "inProcess" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ef22192eaa701e56f7386d32310" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_level_event" ADD CONSTRAINT "FK_4c5306e43cdc2fc79472f1c6fee" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_level_event" DROP CONSTRAINT "FK_4c5306e43cdc2fc79472f1c6fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`DROP TABLE "arena_user_level_event"`);
  }
}
