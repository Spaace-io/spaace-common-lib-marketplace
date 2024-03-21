import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueAddedInProbabilityAndChest1711019079964
  implements MigrationInterface
{
  name = 'UniqueAddedInProbabilityAndChest1711019079964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_chest_probability_genesis" ADD CONSTRAINT "UQ_db9b9e54d34f47b491352104fad" UNIQUE ("minLevel", "maxLevel")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest_genesis" ADD CONSTRAINT "UQ_1d090c2699ae2d964ef51b878c7" UNIQUE ("minChestCount", "maxChestCount")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest_genesis" DROP CONSTRAINT "UQ_1d090c2699ae2d964ef51b878c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_probability_genesis" DROP CONSTRAINT "UQ_db9b9e54d34f47b491352104fad"`,
    );
  }
}
