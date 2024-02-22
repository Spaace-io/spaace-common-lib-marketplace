import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaChestEntitiesFixes1708619259802
  implements MigrationInterface
{
  name = 'ArenaChestEntitiesFixes1708619259802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_genesis_seasons_chest" ("level" numeric(78) NOT NULL DEFAULT '0', "stars" numeric(78) NOT NULL DEFAULT '0', "min" numeric(78) NOT NULL DEFAULT '0', "max" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_7fd9ba24196be9aa6895b567ca9" PRIMARY KEY ("level"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "arena_genesis_seasons_chest"`);
  }
}
