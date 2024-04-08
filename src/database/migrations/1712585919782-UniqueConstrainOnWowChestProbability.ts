import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueConstrainOnWowChestProbability1712585919782
  implements MigrationInterface
{
  name = 'UniqueConstrainOnWowChestProbability1712585919782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ADD CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" DROP CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2"`,
    );
  }
}
