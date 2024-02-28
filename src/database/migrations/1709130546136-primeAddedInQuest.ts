import { MigrationInterface, QueryRunner } from 'typeorm';

export class PrimeAddedInQuest1709130546136 implements MigrationInterface {
  name = 'PrimeAddedInQuest1709130546136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "prime" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "prime"`);
  }
}
