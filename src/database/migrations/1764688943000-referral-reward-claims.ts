import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReferralRewardClaims1764688943000 implements MigrationInterface {
  name = 'ReferralRewardClaims1764688943000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum for claim status
    await queryRunner.query(
      `CREATE TYPE "claim_status" AS ENUM('pending', 'completed', 'failed')`,
    );

    // Create referral_reward_claims table (removed a field)
    await queryRunner.query(
      `CREATE TABLE "referral_reward_claims" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "referrerAddress" character(40) NOT NULL,
        "amount" numeric(78) NOT NULL,
        "status" "claim_status" NOT NULL DEFAULT 'pending',
        "txHash" character(66),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "completedAt" TIMESTAMP,
        CONSTRAINT "PK_referral_reward_claims" PRIMARY KEY ("id")
      )`,
    );

    // Create index for checking pending claims by referrer
    await queryRunner.query(
      `CREATE INDEX "IDX_referral_reward_claims_referrer_status" 
       ON "referral_reward_claims" ("referrerAddress", "status")`,
    );

    // Create index for calculating total claimed by referrer
    await queryRunner.query(
      `CREATE INDEX "IDX_referral_reward_claims_referrer" 
       ON "referral_reward_claims" ("referrerAddress")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_referral_reward_claims_referrer"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_referral_reward_claims_referrer_status"`,
    );

    // Drop table
    await queryRunner.query(`DROP TABLE "referral_reward_claims"`);

    // Drop enum
    await queryRunner.query(`DROP TYPE "claim_status"`);
  }
}
