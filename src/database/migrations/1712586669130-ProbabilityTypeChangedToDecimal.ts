import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProbabilityTypeChangedToDecimal1712586669130
  implements MigrationInterface
{
  name = 'ProbabilityTypeChangedToDecimal1712586669130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" TYPE numeric(78,0)`,
    );
  }
}
