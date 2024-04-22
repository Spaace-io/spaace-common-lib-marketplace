import { MigrationInterface, QueryRunner } from 'typeorm';

export class TotalReferralsRemovedFromUser1713803093375
  implements MigrationInterface
{
  name = 'TotalReferralsRemovedFromUser1713803093375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "totalReferrals"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "totalReferrals" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
  }
}
