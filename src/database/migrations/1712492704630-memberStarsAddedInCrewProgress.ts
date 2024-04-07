import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberStarsAddedInCrewProgress1712492704630
  implements MigrationInterface
{
  name = 'MemberStarsAddedInCrewProgress1712492704630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD "memberStars" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP COLUMN "memberStars"`,
    );
  }
}
