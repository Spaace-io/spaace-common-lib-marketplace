import { MigrationInterface, QueryRunner } from 'typeorm';

export class rewardPeriods1690538968468 implements MigrationInterface {
  name = 'rewardPeriods1690538968468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."reward_period_type" AS ENUM('Trading', 'Referral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward_periods" ("distributor" "public"."reward_period_type" NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, "amount" numeric(78) NOT NULL, "distributed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6babd6a5403539152e46098b0b4" PRIMARY KEY ("distributor", "startTime"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" DROP CONSTRAINT "PK_8803e4d34c3dae3dc7a4987cf3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" ADD CONSTRAINT "PK_7f2dd6f32fc52c74ade6c89ae72" PRIMARY KEY ("userAddress", "distributor", "amount")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" DROP CONSTRAINT "PK_7f2dd6f32fc52c74ade6c89ae72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" ADD CONSTRAINT "PK_8803e4d34c3dae3dc7a4987cf3a" PRIMARY KEY ("userAddress", "distributor", "amount", "timestamp")`,
    );
    await queryRunner.query(`DROP TABLE "reward_periods"`);
    await queryRunner.query(`DROP TYPE "public"."reward_period_type"`);
  }
}
