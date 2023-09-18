import { MigrationInterface, QueryRunner } from 'typeorm';

export class progressNonce1689604427945 implements MigrationInterface {
  name = 'progressNonce1689604427945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "nonce" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_1113118dfa3e1f35571ceebbd68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_1113118dfa3e1f35571ceebbd68" PRIMARY KEY ("userAddress", "seasonNumber", "questId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "nonce"`,
    );
  }
}
