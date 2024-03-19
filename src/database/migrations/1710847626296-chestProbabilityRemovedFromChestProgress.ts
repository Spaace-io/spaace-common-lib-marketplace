import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChestProbabilityRemovedFromChestProgress1710847626296
  implements MigrationInterface
{
  name = 'ChestProbabilityRemovedFromChestProgress1710847626296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_fb3198c7f96b2926505e469be15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP COLUMN "chestProbability"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD "chestProbability" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_fb3198c7f96b2926505e469be15" FOREIGN KEY ("chestProbability") REFERENCES "arena_chest_probability_genesis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
