import { MigrationInterface, QueryRunner } from 'typeorm';

export class rewardsSignature1691087839483 implements MigrationInterface {
  name = 'rewardsSignature1691087839483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" ADD "signature" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."reward_period_type" RENAME TO "reward_period_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."distributor_contract" AS ENUM('Trading', 'Referral', 'Loyalty')`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."distributor_contract" USING "distributor"::"text"::"public"."distributor_contract"`,
    );
    await queryRunner.query(`DROP TYPE "public"."reward_period_type_old"`);
    await queryRunner.query(
      `ALTER TABLE "reward_periods" ALTER COLUMN "endTime" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_3d0844cdd46863d617cbba6297" CHECK ("pk")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_3d0844cdd46863d617cbba6297"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward_periods" ALTER COLUMN "endTime" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reward_period_type_old" AS ENUM('Trading', 'Referral')`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."reward_period_type_old" USING "distributor"::"text"::"public"."reward_period_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."distributor_contract"`);
    await queryRunner.query(
      `ALTER TYPE "public"."reward_period_type_old" RENAME TO "reward_period_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" DROP COLUMN "signature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ((pk = true))`,
    );
  }
}
