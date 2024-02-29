import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCronNameAddedInQuest1709207477686
  implements MigrationInterface
{
  name = 'ArenaCronNameAddedInQuest1709207477686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crons" DROP COLUMN "parameter"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "cronName" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "cronName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crons" ADD "parameter" text array NOT NULL`,
    );
  }
}
