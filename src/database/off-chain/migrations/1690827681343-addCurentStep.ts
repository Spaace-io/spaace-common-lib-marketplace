import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCurentStep1690827681343 implements MigrationInterface {
  name = 'addCurentStep1690827681343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "progressCurrentStep" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_1f33a9060ecaab5da0215be1330" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "countForCurrentStep" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_1f33a9060ecaab5da0215be1330"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep", "countForCurrentStep")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_1f33a9060ecaab5da0215be1330" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "countForCurrentStep"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_1f33a9060ecaab5da0215be1330"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "progressCurrentStep"`,
    );
  }
}
