import { MigrationInterface, QueryRunner } from 'typeorm';

export class IdAddedInChestProgress1710793567972 implements MigrationInterface {
  name = 'IdAddedInChestProgress1710793567972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD "levelId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "PK_5469c47bdedbfbb4f71bce6687c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "PK_860df0344b247b7043213c073ed" PRIMARY KEY ("userTwitter", "levelId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_09df9f3e6607190933a11e78baf" FOREIGN KEY ("levelId") REFERENCES "arena_chest_probability_genesis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_09df9f3e6607190933a11e78baf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "PK_860df0344b247b7043213c073ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "PK_5469c47bdedbfbb4f71bce6687c" PRIMARY KEY ("userTwitter")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP COLUMN "levelId"`,
    );
  }
}
