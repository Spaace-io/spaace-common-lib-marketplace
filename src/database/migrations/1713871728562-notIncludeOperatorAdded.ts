import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotIncludeOperatorAdded1713871728562
  implements MigrationInterface
{
  name = 'NotIncludeOperatorAdded1713871728562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
  }
}
