import { MigrationInterface, QueryRunner } from 'typeorm';

export class TotalXpEarnedAddedInUser1711714944488
  implements MigrationInterface
{
  name = 'TotalXpEarnedAddedInUser1711714944488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" RENAME COLUMN "loyatyPointsEarned" TO "totalXpEarned"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" RENAME COLUMN "totalXpEarned" TO "loyatyPointsEarned"`,
    );
  }
}
