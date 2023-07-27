import { MigrationInterface, QueryRunner } from 'typeorm';

export class rewards1690485116301 implements MigrationInterface {
  name = 'rewards1690485116301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "trading_rewards"`);
    await queryRunner.query(`DROP TABLE "referral_rewards"`);
    await queryRunner.query(
      `CREATE TABLE "staking_rewards" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "pool" character(40) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, CONSTRAINT "PK_851c6379084b24f40772bedcc0f" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."distributor_contract" AS ENUM('Trading', 'Referral', 'Loyalty')`,
    );
    await queryRunner.query(
      `CREATE TABLE "distributor_rewards" ("userAddress" character(40) NOT NULL, "distributor" "public"."distributor_contract" NOT NULL, "amount" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "harvestTxHash" character(64), "harvestLogIdx" numeric(78), "harvestTimestamp" TIMESTAMP, CONSTRAINT "PK_8803e4d34c3dae3dc7a4987cf3a" PRIMARY KEY ("userAddress", "distributor", "amount", "timestamp"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "distributor_rewards"`);
    await queryRunner.query(`DROP TYPE "public"."distributor_contract"`);
    await queryRunner.query(`DROP TABLE "staking_rewards"`);
    await queryRunner.query(
      `CREATE TABLE "referral_rewards" ("userAddress" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "referrer" character(40) NOT NULL, "referrerAmount" numeric(78) NOT NULL, "referredAmount" numeric(78) NOT NULL, CONSTRAINT "PK_747a45a7f86106e2925a99113da" PRIMARY KEY ("user", "date", "referrer"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trading_rewards" ("userAddress" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "buyAmount" numeric(78) NOT NULL, "sellAmount" numeric(78) NOT NULL, CONSTRAINT "PK_afc958bd5194d51375325441597" PRIMARY KEY ("user", "date"))`,
    );
  }
}
