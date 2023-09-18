import { MigrationInterface, QueryRunner } from 'typeorm';

export class questSequence1689606459294 implements MigrationInterface {
  name = 'questSequence1689606459294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" ADD "previousQuestId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "prime" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "REL_f94aec94cffab50834b8edaa1f" UNIQUE ("seasonNumber", "previousQuestId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "REL_f94aec94cffab50834b8edaa1f"`,
    );
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "prime"`);
    await queryRunner.query(
      `ALTER TABLE "quests" DROP COLUMN "previousQuestId"`,
    );
  }
}
