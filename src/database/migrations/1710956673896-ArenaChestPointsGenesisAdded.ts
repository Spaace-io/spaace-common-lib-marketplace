import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaChestPointsGenesisAdded1710956673896
  implements MigrationInterface
{
  name = 'ArenaChestPointsGenesisAdded1710956673896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_chest_points_genesis" ("chestNumber" numeric(78) NOT NULL DEFAULT '0', "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_b4b1e4de56973b0980992eba43d" PRIMARY KEY ("chestNumber"))`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "arena_genesis_seasons_chest"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "arena_chest_points_genesis"`);
    await queryRunner.query(
      `CREATE TABLE "arena_genesis_seasons_chest" (
              "level" numeric(78) NOT NULL DEFAULT '0',
              "stars" numeric(78) NOT NULL DEFAULT '0',
              "min" numeric(78) NOT NULL DEFAULT '0',
              "max" numeric(78) NOT NULL DEFAULT '0',
              CONSTRAINT "PK_0cb5d8862205cb4fa094616d080" PRIMARY KEY ("level")
            )`,
    );
  }
}
