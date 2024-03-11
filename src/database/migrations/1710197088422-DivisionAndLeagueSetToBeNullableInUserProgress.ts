import { MigrationInterface, QueryRunner } from 'typeorm';

export class DivisionAndLeagueSetToBeNullableInUserProgress1710197088422
  implements MigrationInterface
{
  name = 'DivisionAndLeagueSetToBeNullableInUserProgress1710197088422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ALTER COLUMN "division" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ALTER COLUMN "league" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ALTER COLUMN "league" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ALTER COLUMN "division" SET NOT NULL`,
    );
  }
}
