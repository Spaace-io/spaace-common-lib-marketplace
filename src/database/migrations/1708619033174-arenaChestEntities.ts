import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaChestEntities1708619033174 implements MigrationInterface {
  name = 'ArenaChestEntities1708619033174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_581b5643298f37eb2dc095d0d94"`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_chest_points" ("name" text NOT NULL, "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_seasons_chest" ("seasonNumber" numeric(78) NOT NULL, "division" text, "rank" text, "chestCount" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons" ADD "rewardCoefiecient" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_581b5643298f37eb2dc095d0d94" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_738ad7df4a6908002d9789bcf14" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_738ad7df4a6908002d9789bcf14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_581b5643298f37eb2dc095d0d94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons" DROP COLUMN "rewardCoefiecient"`,
    );
    await queryRunner.query(`DROP TABLE "arena_seasons_chest"`);
    await queryRunner.query(`DROP TABLE "arena_chest_points"`);
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_581b5643298f37eb2dc095d0d94" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
