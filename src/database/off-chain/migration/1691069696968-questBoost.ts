import { MigrationInterface, QueryRunner } from 'typeorm';

export class questBoost1691069696968 implements MigrationInterface {
  name = 'questBoost1691069696968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "boost" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "boostLimit" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" TYPE numeric(78,0)`,
    );
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "boostLimit"`);
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "boost"`);
  }
}
