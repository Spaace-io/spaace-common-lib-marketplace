import { MigrationInterface, QueryRunner } from 'typeorm';

export class enums1693490169273 implements MigrationInterface {
  name = 'enums1693490169273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."distributor_contract" RENAME TO "distributor_contract_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."distributor_contract" AS ENUM('TRADING_REWARDS', 'REFERRAL_REWARDS', 'LOYALTY_REWARDS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" ALTER COLUMN "distributor" TYPE "public"."distributor_contract" USING CONCAT(UPPER("distributor"::"text"), '_REWARDS')::"public"."distributor_contract"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."distributor_contract" USING CONCAT(UPPER("distributor"::"text"), '_REWARDS')::"public"."distributor_contract"`,
    );
    await queryRunner.query(`DROP TYPE "public"."distributor_contract_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."order_type" RENAME TO "order_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_type" AS ENUM('ASK', 'BID', 'ENGLISH_AUCTION', 'DUTCH_AUCTION')`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "type" TYPE "public"."order_type" USING REPLACE(UPPER("type"::"text"), 'AUCTION', '_AUCTION')::"public"."order_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_type_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_type_old" AS ENUM('Ask', 'Bid', 'EnglishAuction', 'DutchAuction')`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "type" TYPE "public"."order_type_old" USING REPLACE(INITCAP("type"::"text"), '_Auction', 'Auction')::"public"."order_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."order_type_old" RENAME TO "order_type"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."distributor_contract_old" AS ENUM('Trading', 'Referral', 'Loyalty')`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."distributor_contract_old" USING REPLACE(INITCAP("distributor"::"text"), '_Rewards', '')::"public"."distributor_contract_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "distributor_rewards" ALTER COLUMN "distributor" TYPE "public"."distributor_contract_old" USING REPLACE(INITCAP("distributor"::"text"), '_Rewards', '')::"public"."distributor_contract_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."distributor_contract"`);
    await queryRunner.query(
      `ALTER TYPE "public"."distributor_contract_old" RENAME TO "distributor_contract"`,
    );
  }
}
