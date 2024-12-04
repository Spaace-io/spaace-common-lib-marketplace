import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuestTypeToQuests1732293508607 implements MigrationInterface {
  name = 'AddQuestTypeToQuests1732293508607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "quest_type_enum" AS ENUM ('GENESIS', 'PRIME', 'DAILY', 'PROGRESSIVE')`,
    );

    await queryRunner.query(
      `ALTER TABLE "quests" ADD "questType" "quest_type_enum" NOT NULL DEFAULT 'GENESIS'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "questType"`);

    await queryRunner.query(`DROP TYPE "quest_type_enum"`);
  }
}
