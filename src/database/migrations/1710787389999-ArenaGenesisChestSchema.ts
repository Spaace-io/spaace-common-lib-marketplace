import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaGenesisChestSchema1710787389999
  implements MigrationInterface
{
  name = 'ArenaGenesisChestSchema1710787389999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_levels" ("level" numeric(78) NOT NULL DEFAULT '0', "stars" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_0cb5d8862205cb4fa094616d080" PRIMARY KEY ("level"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_chest_probability_genesis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minLevel" numeric(78) NOT NULL DEFAULT '0', "maxLevel" numeric(78) NOT NULL DEFAULT '0', "probability" numeric(78) NOT NULL DEFAULT '0', "maxChest" numeric(78) NOT NULL DEFAULT '0', "maxLevelWithoutChest" numeric(78) NOT NULL DEFAULT '0', "minLevelBetweenChest" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_0bdb056f06281a33341e9bcf4dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_seasons_chest_genesis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minChestCount" numeric(78) NOT NULL DEFAULT '0', "maxChestCount" numeric(78) NOT NULL DEFAULT '0', "tiers" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_013863e24f5aa4cdd39b950ef9a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_chest_progress_genesis" ("userTwitter" text NOT NULL, "chestProbability" uuid NOT NULL, "totalChestReceived" numeric(78) NOT NULL DEFAULT '0', "lastChestReceivedOnLevel" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_5469c47bdedbfbb4f71bce6687c" PRIMARY KEY ("userTwitter"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_5469c47bdedbfbb4f71bce6687c" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_fb3198c7f96b2926505e469be15" FOREIGN KEY ("chestProbability") REFERENCES "arena_chest_probability_genesis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_fb3198c7f96b2926505e469be15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_5469c47bdedbfbb4f71bce6687c"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_chest_progress_genesis"`);
    await queryRunner.query(`DROP TABLE "arena_seasons_chest_genesis"`);
    await queryRunner.query(`DROP TABLE "arena_chest_probability_genesis"`);
    await queryRunner.query(`DROP TABLE "arena_levels"`);
  }
}
