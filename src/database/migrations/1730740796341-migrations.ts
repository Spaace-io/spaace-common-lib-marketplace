import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730740796341 implements MigrationInterface {
  name = 'Migrations1730740796341';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "latest_block" ("pk" boolean NOT NULL DEFAULT true, "number" numeric(78) NOT NULL, "hash" character(64) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_a6e4d39162b05136d98f963774" CHECK (pk = TRUE), CONSTRAINT "PK_7b31af3e9abf8a0d5b6984dff44" PRIMARY KEY ("pk"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "last_refresh" ("pk" boolean NOT NULL DEFAULT true, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ("pk" = TRUE), CONSTRAINT "PK_0dc50ad411bca7361507c40d7e1" PRIMARY KEY ("pk"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token_transfers" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "from" character(40) NOT NULL, "to" character(40) NOT NULL, "currency" character(40) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_577b7d4a5f8030441dcb95e9a7b" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4c29e58b1e24afe6a420eac12" ON "token_transfers" ("timestamp") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."collection_type" AS ENUM('ERC721', 'ERC1155')`,
    );
    await queryRunner.query(
      `CREATE TABLE "collections" ("address" character(40) NOT NULL, "type" "public"."collection_type" NOT NULL, "name" text, "symbol" text, "imageUrl" text, "active" boolean NOT NULL DEFAULT true, "verified" boolean NOT NULL DEFAULT false, "explicit" boolean NOT NULL DEFAULT false, "bannerUrl" text, "description" text, "deployedAt" TIMESTAMP, "deployer" character(40), "links" jsonb NOT NULL DEFAULT '[]', "lastImport" TIMESTAMP, CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "title" text, "description" text, "tokenUri" text, "decimals" numeric(2), "rarityRanking" numeric(78), "rarityScore" double precision, "lastImport" TIMESTAMP, CONSTRAINT "PK_77a2ad67a01059ccd7e3b6df3ec" PRIMARY KEY ("collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_77a2ad67a01059ccd7e3b6df3e" ON "items" ("collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "item_medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "primary" boolean NOT NULL, "raw" text NOT NULL, CONSTRAINT "PK_1ffc8f063fdd9c5a8277515bc33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d05b0895c77fadc66c6c6df74d" ON "item_medias" ("collectionAddress", "tokenId", "id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e22a1534050888010eb130fb1a" ON "item_medias" ("collectionAddress", "tokenId") WHERE "primary"`,
    );
    await queryRunner.query(
      `CREATE TABLE "item_attributes" ("collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "traitHash" character(40) NOT NULL, "trait" text NOT NULL, "valueHash" character(40) NOT NULL, "value" text NOT NULL, CONSTRAINT "PK_b1478d78161a2434a3beab664b3" PRIMARY KEY ("collectionAddress", "tokenId", "traitHash"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a9502e3dd5540b99b8a927015" ON "item_attributes" ("collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1866bd8ac2446df677ded46be6" ON "item_attributes" ("collectionAddress", "traitHash", "valueHash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "transfers" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "from" character(40) NOT NULL, "to" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "batch" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_70222dd18791828bd64ca2552e2" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_949ca1a8640dba9fde696bc9ed" ON "transfers" ("collectionAddress", "tokenId", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_48ff10123de1f12ad97d9389ec" ON "transfers" ("to", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6ad30b2019d8c3c912e8ebcbad" ON "transfers" ("from", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6446d8f923c6a64337de94a4f" ON "transfers" ("timestamp") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."marketplace" AS ENUM('SPAACE', 'OPENSEA', 'BLUR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "orderHash" character(64) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "from" character(40) NOT NULL, "to" character(40) NOT NULL, "price" numeric(78) NOT NULL, "currency" character(40) NOT NULL, "marketplace" "public"."marketplace" NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af745151659fc2b3ae3b81ca9d7" PRIMARY KEY ("txHash", "logIdx", "collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_134cc4bb09e09430239513a907" ON "sales" ("orderHash") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f7931cf6fcf04f0899ff8a2405" ON "sales" ("collectionAddress", "tokenId", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d68251a8e87059a9f7988f3fe" ON "sales" ("collectionAddress", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7b9e171cf268ba8a046a7880ef" ON "sales" ("to", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2c4359130e7be0d1b845c418b" ON "sales" ("from", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0558657f578aa1eee221654227" ON "sales" ("timestamp") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staking_type" AS ENUM('PASSIVE', 'ACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staking_deposits" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "type" "public"."staking_type" NOT NULL, "pool" character(40) NOT NULL, "userAddress" character(40) NOT NULL, "shares" numeric(78) NOT NULL, "tokens" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "depositId" numeric(78), "lockTypeId" numeric(78), "vestingTypeId" numeric(78), CONSTRAINT "PK_a9faf6c57ab8c33732fb50dfa2c" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41126261e9a22d2405c6ebde64" ON "staking_deposits" ("userAddress", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c866abee7aaf01b4f6a6d6f006" ON "staking_deposits" ("pool", "userAddress", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c53bae28da13037f9a0b91ea2d" ON "staking_deposits" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "staking_harvests" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "pool" character(40) NOT NULL, "userAddress" character(40) NOT NULL, "depositId" numeric(78) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4ad66b4ae348510c177b724b24f" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ada1107b0f23186413bec8efcf" ON "staking_harvests" ("pool", "token", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE TABLE "staking_rewards" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "pool" character(40) NOT NULL, "vestingTypeId" numeric(78), "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_851c6379084b24f40772bedcc0f" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2549ba360e748e384808519f3" ON "staking_rewards" ("pool", "token", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE TABLE "balances" ("collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "balance" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_b6530d290e993630ce3e1d3b0f1" PRIMARY KEY ("collectionAddress", "tokenId", "userAddress"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5037fb0b2a13ac921c73a05492" ON "balances" ("userAddress", "collectionAddress", "tokenId") WHERE "balance" > 0`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4859f158ae3d83ed963fd88e9b" ON "balances" ("collectionAddress", "tokenId", "balance") WHERE "balance" > 0`,
    );
    await queryRunner.query(
      `CREATE TABLE "token_balances" ("currency" character(40) NOT NULL, "userAddress" character(40) NOT NULL, "balance" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_985e4f6c85bfb2ebac16a3908db" PRIMARY KEY ("currency", "userAddress"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b7195f977f51ee35c43cda5000" ON "token_balances" ("userAddress", "currency", "balance") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a4d4751963a565d8085df2759" ON "token_balances" ("currency", "balance") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."distributor_contract" AS ENUM('TRADING_REWARDS', 'REFERRAL_REWARDS', 'LOYALTY_REWARDS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "distributor_rewards" ("userAddress" character(40) NOT NULL, "distributor" "public"."distributor_contract" NOT NULL, "amount" numeric(78) NOT NULL, "signature" text NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "harvestTxHash" character(64), "harvestLogIdx" numeric(78), "harvestTimestamp" TIMESTAMP, CONSTRAINT "PK_7f2dd6f32fc52c74ade6c89ae72" PRIMARY KEY ("userAddress", "distributor", "amount"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f54ad337df477893cd474b5b7" ON "distributor_rewards" ("userAddress", "distributor", "amount") WHERE "harvestTimestamp" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12796feacc86a1415cb0828d0" ON "distributor_rewards" ("userAddress", "distributor", "amount") WHERE "harvestTimestamp" IS NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward_periods" ("distributor" "public"."distributor_contract" NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP NOT NULL, "amount" numeric(78) NOT NULL, "distributed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6babd6a5403539152e46098b0b4" PRIMARY KEY ("distributor", "startTime"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_type" AS ENUM('ASK', 'BID', 'ENGLISH_AUCTION', 'DUTCH_AUCTION')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("hash" character(64) NOT NULL, "userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "type" "public"."order_type" NOT NULL, "marketplace" "public"."marketplace" NOT NULL, "price" numeric(78) NOT NULL, "startingPrice" numeric(78), "currency" character(40) NOT NULL, "marketplaceFeeBps" smallint NOT NULL, "marketplaceFeeReceiver" character(40), "royaltiesBps" smallint NOT NULL, "startingRoyalties" numeric(78), "royaltiesReceiver" character(40), "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "counter" numeric(78) NOT NULL, "signature" text NOT NULL, "salt" text, "zone" text, "conduitKey" text, "protocolAddress" character(40), "cancelTxHash" character(64), "cancelLogIdx" numeric(78), "cancelTimestamp" TIMESTAMP, "fulfillQuantity" numeric(78) NOT NULL DEFAULT '0', "remainingQuantity" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8015da564b715d467c36eb4cfb" ON "orders" ("userAddress", "counter") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ed5303e883ab8bda04aeda2564" ON "orders" ("userAddress", "collectionAddress") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b6c737c16b17e9b2b2868e9e9" ON "orders" ("collectionAddress", "startTime") `,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_items" ("hash" character(64) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "orderHash" character(64), "itemEntityCollectionAddress" character(40), "itemEntityTokenId" numeric(78), CONSTRAINT "PK_ce4b762f4246205df79d7c0d29e" PRIMARY KEY ("hash", "collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce4b762f4246205df79d7c0d29" ON "orders_items" ("hash", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1316a9334a23e5c5b1b180e32" ON "orders_items" ("hash", "collectionAddress") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ceaf9a1e2286ed3b7ac7b3e6a" ON "orders_items" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "login_nonces" ("nonce" character(32) NOT NULL, "address" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8da3f5a598f7e0e5744cf7680d4" PRIMARY KEY ("nonce"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("address" character(40) NOT NULL, "name" text, "email" text, "biography" text, "imageUrl" text, "bannerUrl" text, "admin" boolean NOT NULL DEFAULT false, "referralCode" text NOT NULL, "referrerAddress" character(40), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b7f8278f4e89249bb75c9a15899" UNIQUE ("referralCode"), CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("address"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notable_collections" ("collectionAddress" character(40) NOT NULL, CONSTRAINT "PK_b927dbd37a77ed934fcf53d185d" PRIMARY KEY ("collectionAddress"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hidden_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_c84aeceb104a1a0f0e923e1ab15" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c84aeceb104a1a0f0e923e1ab1" ON "hidden_items" ("userAddress", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "seasons" ("number" numeric(78) NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, CONSTRAINT "PK_4b3a0e07a243b350d51796064d3" PRIMARY KEY ("number"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7e703d89736f55eee5b6fa68c2" ON "seasons" ("startTime") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."rank" AS ENUM('BRONZE_5', 'BRONZE_4', 'BRONZE_3', 'BRONZE_2', 'BRONZE_1', 'SILVER_5', 'SILVER_4', 'SILVER_3', 'SILVER_2', 'SILVER_1', 'GOLD_5', 'GOLD_4', 'GOLD_3', 'GOLD_2', 'GOLD_1', 'PLATINUM_5', 'PLATINUM_4', 'PLATINUM_3', 'PLATINUM_2', 'PLATINUM_1', 'DIAMOND_5', 'DIAMOND_4', 'DIAMOND_3', 'DIAMOND_2', 'DIAMOND_1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "season_ranks" ("seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "threshold" numeric(78) NOT NULL, "rewards" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_5700c760e314c8816befbdc2c69" PRIMARY KEY ("seasonNumber", "rank"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ed3f26097caa408923b69e5ab2" ON "season_ranks" ("seasonNumber", "threshold") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quest_period" AS ENUM('DAILY', 'SEASONAL')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."loyalty_rank" AS ENUM('BRONZE_5', 'BRONZE_4', 'BRONZE_3', 'BRONZE_2', 'BRONZE_1', 'SILVER_5', 'SILVER_4', 'SILVER_3', 'SILVER_2', 'SILVER_1', 'GOLD_5', 'GOLD_4', 'GOLD_3', 'GOLD_2', 'GOLD_1', 'PLATINUM_5', 'PLATINUM_4', 'PLATINUM_3', 'PLATINUM_2', 'PLATINUM_1', 'DIAMOND_5', 'DIAMOND_4', 'DIAMOND_3', 'DIAMOND_2', 'DIAMOND_1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quests" ("seasonNumber" numeric(78) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "previousQuestId" uuid, "count" numeric(78) NOT NULL, "prime" boolean NOT NULL DEFAULT false, "steps" jsonb NOT NULL DEFAULT '[]', "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0', "boost" numeric(78) NOT NULL DEFAULT '0', "boostLimit" numeric(78), "limit" numeric(78) NOT NULL DEFAULT '1', "period" "public"."quest_period" NOT NULL, "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5', CONSTRAINT "UQ_4d91b52a8e3fe3ce2caac4a6139" UNIQUE ("seasonNumber", "name"), CONSTRAINT "REL_f94aec94cffab50834b8edaa1f" UNIQUE ("seasonNumber", "previousQuestId"), CONSTRAINT "PK_3a6a6a0b62780e61b384452424b" PRIMARY KEY ("seasonNumber", "id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_loyalties" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "points" numeric(78) NOT NULL DEFAULT '0', "questCompleted" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_5254410832e753bed54603862d8" PRIMARY KEY ("userAddress", "seasonNumber"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70dee80d600300da49dd4d1e34" ON "user_loyalties" ("seasonNumber", "points") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_quest_progress" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ef2260573a9244e2eb7208341" ON "user_quest_progress" ("userAddress", "seasonNumber", "questId") WHERE "completed"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_season_rank_claims" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "rewards" jsonb NOT NULL DEFAULT '[]', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a26daaaa51a62c72f07c4d843d9" PRIMARY KEY ("userAddress", "seasonNumber", "rank"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_a0df34081b7a800e85cd78cfce3" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_dd8b4ee8d658dbbc0a9360f28b" ON "likes" ("userAddress", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."report_reason" AS ENUM('FAKE', 'EXPLICIT', 'SPAM', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "reason" "public"."report_reason" NOT NULL, CONSTRAINT "UQ_66592117509d55235181645b336" UNIQUE ("userAddress", "collectionAddress", "tokenId"), CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users" ("twitterUsername" text NOT NULL, "twitterBio" text NOT NULL DEFAULT '', "userTwitterId" text NOT NULL, "twitterPicture" text NOT NULL, "name" text, "imageUrl" text, "referralCode" text NOT NULL, "referralCodeLastShared" TIMESTAMP NOT NULL DEFAULT now(), "referrerTwitterId" text, "crewName" text, "totalXpEarned" numeric(78) NOT NULL DEFAULT '0', "totalStarsEarned" numeric(78) NOT NULL DEFAULT '0', "level" numeric(78) NOT NULL DEFAULT '0', "dailyStreak" numeric(78) NOT NULL DEFAULT '0', "lastActive" TIMESTAMP NOT NULL DEFAULT now(), "accountCreationDate" TIMESTAMP NOT NULL DEFAULT now(), "twitterAccountCreationDate" TIMESTAMP NOT NULL DEFAULT now(), "twitterSecretToken" text NOT NULL, "twitterAccessToken" text NOT NULL, "userWalletAddress" text, "isOnboardingChestClaimed" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac" UNIQUE ("referralCode"), CONSTRAINT "UQ_85642adebf0f867ebb474a473e6" UNIQUE ("twitterSecretToken"), CONSTRAINT "UQ_50231f38688a079dc31f67399ad" UNIQUE ("twitterAccessToken"), CONSTRAINT "PK_e830721892799dc0da5013bbc0d" PRIMARY KEY ("userTwitterId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5369e233e18e92fecb08b7991a" ON "arena_users" ("twitterUsername") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6116a28ce34f6bcb2fb3735f5a" ON "arena_users" ("referralCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0cece92ebcf29a89687133a476" ON "arena_users" ("crewName") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_divison_name" AS ENUM('DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_progress" ("userTwitterId" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "xp" numeric(78) NOT NULL DEFAULT '0', "totalReferrals" numeric(78) NOT NULL DEFAULT '0', "totalReferralStars" numeric(78) NOT NULL DEFAULT '0', "questCompleted" bigint NOT NULL DEFAULT '0', "division" "public"."arena_divison_name", "league" text, "rank" numeric(78) NOT NULL DEFAULT '0', "leagueRank" numeric(78) NOT NULL DEFAULT '0', "twentyFourHourRank" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_6450bfdfc1d35a6cef49994c0dd" PRIMARY KEY ("userTwitterId", "seasonNumber"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_adbe3f13cde72d3e0e59cc2745" ON "arena_users_progress" ("rank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d28e5a1d308eeba7eb74223b3" ON "arena_users_progress" ("twentyFourHourRank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0bf4352e67a4f9082b2d879390" ON "arena_users_progress" ("division", "league", "leagueRank") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_seasons" ("number" numeric(78) NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, "rewardCoefiecient" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_391e31fcb27b18dc62cba155555" PRIMARY KEY ("number"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d4472d06a5fac99cd2361b28cc" ON "arena_seasons" ("startTime") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_divisions" ("seasonNumber" numeric(78) NOT NULL, "name" "public"."arena_divison_name" NOT NULL, "numberOfLeagues" numeric NOT NULL, CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_leagues" ("seasonNumber" numeric(78) NOT NULL, "divisionName" "public"."arena_divison_name" NOT NULL, "leagueNumber" numeric(78) NOT NULL, "numberOfUsers" numeric NOT NULL, CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "divisionName", "leagueNumber"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_user_level_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitterId" text NOT NULL, "oldLevel" numeric(78) NOT NULL DEFAULT '0', "newLevel" numeric(78) NOT NULL DEFAULT '0', "inProcess" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ef22192eaa701e56f7386d32310" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW', 'ONBOARDING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_sub_type" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'COMMUNITY_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'REFERRAL_SOCIAL', 'OTHERS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_quests" ("seasonNumber" numeric(78) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "previousQuestId" uuid, "referenceQuestId" uuid, "count" numeric(78) NOT NULL, "steps" jsonb NOT NULL DEFAULT '[]', "operations" jsonb NOT NULL DEFAULT '[]', "stars" numeric(78) NOT NULL DEFAULT '0', "limit" numeric(78) NOT NULL DEFAULT '1', "period" "public"."quest_period" NOT NULL, "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5', "type" "public"."arena_quest_type" NOT NULL, "subType" "public"."arena_quest_sub_type" NOT NULL, "cronName" text, "cronParameter" text, "link" text, "image" text, "isVisible" boolean NOT NULL DEFAULT true, "allSeasonId" text, CONSTRAINT "UQ_9584ee667d7a54a163e70ea6eb8" UNIQUE ("seasonNumber", "name"), CONSTRAINT "REL_ccac340383b05000d610f79473" UNIQUE ("seasonNumber", "previousQuestId"), CONSTRAINT "PK_a1dba9cc4f41b4f7c00a0d05fe9" PRIMARY KEY ("seasonNumber", "id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_quest_progress" ("userTwitterId" text NOT NULL, "questId" uuid NOT NULL, "seasonNumber" numeric(78) NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87a03813428ab4a75d856cef528" PRIMARY KEY ("userTwitterId", "questId", "seasonNumber", "nonce"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3cd5e9a2a6827f571ad6d7da60" ON "arena_quest_progress" ("userTwitterId", "seasonNumber", "questId") WHERE "completed"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_chest_name" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS', 'CREW', 'REFERRAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_chest_points" ("name" "public"."arena_chest_name" NOT NULL, "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_levels" ("level" numeric(78) NOT NULL DEFAULT '0', "stars" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_0cb5d8862205cb4fa094616d080" PRIMARY KEY ("level"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_seasons_chest" ("divisionName" "public"."arena_divison_name" NOT NULL, "rank" text NOT NULL, "chestCount" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_de046ac583e8be33d3b9f42f4a1" PRIMARY KEY ("divisionName", "rank"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_earned_chest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitterId" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "xp" numeric(78) NOT NULL DEFAULT '0', "stars" numeric(78) NOT NULL DEFAULT '0', "chestName" text NOT NULL, "isClaimed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d2d5c36f6503c8772dc1b8d05bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b24ff8e11120eba8598149a0b" ON "arena_users_earned_chest" ("userTwitterId", "id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_user_statistics" ("userTwitterId" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "totalLikes" numeric(78) NOT NULL DEFAULT '0', "totalReposts" numeric(78) NOT NULL DEFAULT '0', "totalReplies" numeric(78) NOT NULL DEFAULT '0', "totalQuotes" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_08b6c6c47252c66d338a660d198" PRIMARY KEY ("userTwitterId", "seasonNumber"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_global_leaderboard" ("userTwitter" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_f4169a5bd90ab63ba0a9f3f6d48" PRIMARY KEY ("userTwitter"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crew_leaderboard" ("crewName" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_68d58841f613bb3363032f3e985" PRIMARY KEY ("crewName"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crews" ("name" text NOT NULL, "owner" text, "description" text, "discord" text, "link" text NOT NULL, "password" text NOT NULL, "banner" text, "profile" text, "totalMembers" numeric(78) NOT NULL DEFAULT '0', "totalStarsEarned" numeric(78) NOT NULL DEFAULT '0', "creationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_6a10bdf74fc88e7df1b32251e0" UNIQUE ("owner"), CONSTRAINT "PK_53feb0270ffc58e7ed5f1f0ae46" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_53feb0270ffc58e7ed5f1f0ae4" ON "arena_crews" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crew_progress" ("crewName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "memberStars" numeric(78) NOT NULL DEFAULT '0', "questCompleted" bigint NOT NULL DEFAULT '0', "rank" numeric(78) NOT NULL DEFAULT '0', "twentyFourHourRank" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_7d564ee5d1ab3a80bebee9368ef" PRIMARY KEY ("crewName", "seasonNumber"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84bde20a3cea54eb69312a7868" ON "arena_crew_progress" ("stars") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_46ba2feb436b75b81849164b9a" ON "arena_crew_progress" ("rank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c511f9ef0a4a2e41cec14153df" ON "arena_crew_progress" ("twentyFourHourRank") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crons" ("name" text NOT NULL, "pointer" text NOT NULL, CONSTRAINT "PK_24a31d6a92279955be8832fe7ea" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_spaace_tweet" ("tweetId" text NOT NULL, "likePaginationToken" text NOT NULL, "replyPaginationToken" text NOT NULL, "quotePaginationToken" text NOT NULL, "retweetPaginationToken" text NOT NULL, "primePost" boolean NOT NULL DEFAULT false, "onboardingPost" boolean NOT NULL DEFAULT false, "communityPost" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d02aaa5d3b3eda8e962da3a938" ON "arena_spaace_tweet" ("primePost") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c85ab52359178efe108bec82aa" ON "arena_spaace_tweet" ("onboardingPost") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce88aedfa102b3525512e21c86" ON "arena_spaace_tweet" ("communityPost") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_tweet" ("id" text NOT NULL, "authorId" text NOT NULL, "text" text NOT NULL, "likeCount" numeric(78) NOT NULL DEFAULT '0', "replyCount" numeric(78) NOT NULL DEFAULT '0', "retweetCount" numeric(78) NOT NULL DEFAULT '0', "viewCount" numeric(78) NOT NULL DEFAULT '0', "quoteCount" numeric(78) NOT NULL DEFAULT '0', "quoteTweetId" text, "replyTweetId" text, "repliesLastFetched" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_137bbd977cd59a0256a50ff5689" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_07accd2c97ad4cab9b5ddbeb07" ON "arena_tweet" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0810a60411cef26ad2362748e" ON "arena_tweet" ("text") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_chest_points_genesis" ("chestNumber" numeric(78) NOT NULL DEFAULT '0', "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_b4b1e4de56973b0980992eba43d" PRIMARY KEY ("chestNumber"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_chest_probability_genesis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minLevel" numeric(78) NOT NULL DEFAULT '0', "maxLevel" numeric(78) NOT NULL DEFAULT '0', "probability" numeric(78) NOT NULL DEFAULT '0', "maxChest" numeric(78) NOT NULL DEFAULT '0', "maxLevelWithoutChest" numeric(78) NOT NULL DEFAULT '0', "minLevelBetweenChest" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "UQ_db9b9e54d34f47b491352104fad" UNIQUE ("minLevel", "maxLevel"), CONSTRAINT "PK_0bdb056f06281a33341e9bcf4dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_seasons_chest_genesis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minChestCount" numeric(78) NOT NULL DEFAULT '0', "maxChestCount" numeric(78) NOT NULL DEFAULT '0', "tiers" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_1d090c2699ae2d964ef51b878c7" UNIQUE ("minChestCount", "maxChestCount"), CONSTRAINT "PK_013863e24f5aa4cdd39b950ef9a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_chest_progress_genesis" ("levelId" uuid NOT NULL, "userTwitterId" text NOT NULL, "totalChestReceived" numeric(78) NOT NULL DEFAULT '0', "lastChestReceivedOnLevel" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_9baa495e17967a10de54a76484b" PRIMARY KEY ("levelId", "userTwitterId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crew_stars_tracking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crewName" text NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9367de0f2d3e97beb1ed72cf296" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crew_quest_progress" ("crewName" text NOT NULL, "questId" uuid NOT NULL, "seasonNumber" numeric(78) NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_179dc7274f205b891814dc784d2" PRIMARY KEY ("crewName", "questId", "seasonNumber", "nonce"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7fee30aff1fe8f6877383958a4" ON "arena_crew_quest_progress" ("crewName", "seasonNumber", "questId") WHERE "completed"`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_spaace_onboarding_tweet_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitter" text NOT NULL, "tweetId" text NOT NULL, "actionType" text NOT NULL, CONSTRAINT "PK_31d3af91969ca277c4467ed19e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_user_stars_tracking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitterId" text NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bbafe775a9c17fc0288642d410f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86c55a1a06538cf396e4dbbd93" ON "arena_user_stars_tracking" ("userTwitterId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_wow_chest_type" AS ENUM('XP', 'BOOSTER', 'EMPTY', 'BITCOIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_wow_chest_probability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."arena_wow_chest_type" NOT NULL, "value" numeric(78) NOT NULL DEFAULT '0', "probability" numeric(10,2) NOT NULL DEFAULT '0.00', CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value"), CONSTRAINT "PK_3343967b7e6f23a8908cad8cdb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_wow_chest_period" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP NOT NULL DEFAULT now(), "numberOfChest" numeric(78) NOT NULL DEFAULT '0', "starsThreshold" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_dcbdc01eba32a92f4751543d688" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_claimed_wow_chest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chestPeriod" uuid NOT NULL, "userTwitterId" text NOT NULL, "type" text NOT NULL, "value" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38f29efec3d06710a103f5e43c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e6c6386c1872b76c624596129" ON "arena_users_claimed_wow_chest" ("chestPeriod", "userTwitterId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."booster_type" AS ENUM('SPECIAL', 'WOW_CHEST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_users_booster" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitterId" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "expiresOn" TIMESTAMP NOT NULL DEFAULT now(), "booster" numeric(78) NOT NULL DEFAULT '0', "type" "public"."booster_type" NOT NULL, CONSTRAINT "PK_d33d583ef49900681a9e08ba229" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d88598a9b134a17250fd0761fd" ON "arena_users_booster" ("userTwitterId", "seasonNumber", "expiresOn") `,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crew_chest_points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minRank" numeric(78) NOT NULL DEFAULT '0', "maxRank" numeric(78) NOT NULL DEFAULT '0', "tiers" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_d8279cff4cd34c04adcd6bf9ef7" UNIQUE ("minRank", "maxRank"), CONSTRAINT "PK_4ee6b76059733e2ce25ab2ac830" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_admins" ("twitterUsername" text NOT NULL, "twitterId" text NOT NULL, "twitterPicture" text NOT NULL, "accountCreationDate" TIMESTAMP NOT NULL DEFAULT now(), "twitterSecretToken" text NOT NULL, "twitterAccessToken" text NOT NULL, "walletAddress" text, "tweetLikePaginationToken" text, CONSTRAINT "UQ_8bcd19483ca2f3cce10f5c7c1c5" UNIQUE ("twitterSecretToken"), CONSTRAINT "UQ_9afd302499fb0a4bc6b34ef96f8" UNIQUE ("twitterAccessToken"), CONSTRAINT "PK_22dd9d4a53becb4a0de255e7a16" PRIMARY KEY ("twitterId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "collection_rankings_cache" ("address" character(40) NOT NULL, "volume" numeric(78) NOT NULL DEFAULT '0', "volume1h" numeric(78) NOT NULL DEFAULT '0', "volume6h" numeric(78) NOT NULL DEFAULT '0', "volume24h" numeric(78) NOT NULL DEFAULT '0', "volume7d" numeric(78) NOT NULL DEFAULT '0', "volume30d" numeric(78) NOT NULL DEFAULT '0', "volume90d" numeric(78) NOT NULL DEFAULT '0', "previousVolume1h" numeric(78) NOT NULL DEFAULT '0', "previousVolume6h" numeric(78) NOT NULL DEFAULT '0', "previousVolume24h" numeric(78) NOT NULL DEFAULT '0', "previousVolume7d" numeric(78) NOT NULL DEFAULT '0', "previousVolume30d" numeric(78) NOT NULL DEFAULT '0', "previousVolume90d" numeric(78) NOT NULL DEFAULT '0', "floorPrice" numeric(78), "previousFloorPrice1h" numeric(78), "previousFloorPrice6h" numeric(78), "previousFloorPrice24h" numeric(78), "previousFloorPrice7d" numeric(78), "previousFloorPrice30d" numeric(78), "previousFloorPrice90d" numeric(78), "saleCount" numeric(78) NOT NULL DEFAULT '0', "saleCount1h" numeric(78) NOT NULL DEFAULT '0', "saleCount6h" numeric(78) NOT NULL DEFAULT '0', "saleCount24h" numeric(78) NOT NULL DEFAULT '0', "saleCount7d" numeric(78) NOT NULL DEFAULT '0', "saleCount30d" numeric(78) NOT NULL DEFAULT '0', "saleCount90d" numeric(78) NOT NULL DEFAULT '0', "previousSaleCount1h" numeric(78) NOT NULL DEFAULT '0', "previousSaleCount6h" numeric(78) NOT NULL DEFAULT '0', "previousSaleCount24h" numeric(78) NOT NULL DEFAULT '0', "previousSaleCount7d" numeric(78) NOT NULL DEFAULT '0', "previousSaleCount30d" numeric(78) NOT NULL DEFAULT '0', "previousSaleCount90d" numeric(78) NOT NULL DEFAULT '0', "totalSupply" numeric(78) NOT NULL DEFAULT '0', "ownerCount" numeric(78) NOT NULL DEFAULT '0', "listedCount" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_372f08cce6315ff748f0605db69" PRIMARY KEY ("address"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a90030b5aeb0928bcdcc55cf19" ON "collection_rankings_cache" ("previousSaleCount90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cbb6ec802cc6619ede1e468ae8" ON "collection_rankings_cache" ("previousSaleCount30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f69bf6b8e5aa033c2039c652e" ON "collection_rankings_cache" ("previousSaleCount7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_260239fda621a869ade81670cf" ON "collection_rankings_cache" ("previousSaleCount24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce8a640bfd03f32da7436dc06c" ON "collection_rankings_cache" ("previousSaleCount6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_024347fcfc9d8e48f9c65705d8" ON "collection_rankings_cache" ("previousSaleCount1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa8ebee98ce8a49f619362c453" ON "collection_rankings_cache" ("saleCount90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2bcbb453635cf8b1296e76df4e" ON "collection_rankings_cache" ("saleCount30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4259a6b20b2c613de99daf44d7" ON "collection_rankings_cache" ("saleCount7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f5ed5354eebf6979cdbed0deb0" ON "collection_rankings_cache" ("saleCount24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d57698ba1c360dbe7e04d7b382" ON "collection_rankings_cache" ("saleCount6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d95951c6f13359e9bc2a49bed1" ON "collection_rankings_cache" ("saleCount1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4cb243afbbf4bc1497f9d9550a" ON "collection_rankings_cache" ("saleCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1872fcd12e98ec90278c5d34d" ON "collection_rankings_cache" ("previousFloorPrice90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3f1edde9e36fbca871819f861" ON "collection_rankings_cache" ("previousFloorPrice30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_361ac95dbd56e20dbd9d6f93ba" ON "collection_rankings_cache" ("previousFloorPrice7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21347659be38cc7a878e871bc3" ON "collection_rankings_cache" ("previousFloorPrice24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c1bc78ebd9cecc7dca6793060" ON "collection_rankings_cache" ("previousFloorPrice6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf7a5708a0d32c91f98799c174" ON "collection_rankings_cache" ("previousFloorPrice1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca00a94c02dba69e5605367472" ON "collection_rankings_cache" ("floorPrice") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6688ed0ceb82e95f6975e14a3e" ON "collection_rankings_cache" ("previousVolume90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d9ba0151823fdcd100d0f81536" ON "collection_rankings_cache" ("previousVolume30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_80dc012d87c3e3261a1a0dcc2b" ON "collection_rankings_cache" ("previousVolume7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ed9f478f54b494990997ba425" ON "collection_rankings_cache" ("previousVolume24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be3febb756fbf3bc6d618dd845" ON "collection_rankings_cache" ("previousVolume6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1823d008c8023b6b0a589b10c" ON "collection_rankings_cache" ("previousVolume1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6aacdfc6997c3a8c665c97f9b" ON "collection_rankings_cache" ("volume90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e33af69bf81bef914cf9758a12" ON "collection_rankings_cache" ("volume30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_404b0993f307ab4ecc1eb240cb" ON "collection_rankings_cache" ("volume7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_22bc22d06378750c6891970cfa" ON "collection_rankings_cache" ("volume24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_508017d641b5f3f0b89cc84d0a" ON "collection_rankings_cache" ("volume6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b8893e59fda1cee1b2508e1d1" ON "collection_rankings_cache" ("volume1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8aa2834ec0fbeee533eebc1ea" ON "collection_rankings_cache" ("volume") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_372f08cce6315ff748f0605db6" ON "collection_rankings_cache" ("address") `,
    );
    await queryRunner.query(
      `CREATE TABLE "active_orders_cache" ("hash" character(64) NOT NULL, "userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "type" "public"."order_type" NOT NULL, "marketplace" "public"."marketplace" NOT NULL, "price" numeric(78) NOT NULL, "startingPrice" numeric(78), "currency" character(40) NOT NULL, "marketplaceFeeBps" smallint NOT NULL, "marketplaceFeeReceiver" character(40), "royaltiesBps" smallint NOT NULL, "startingRoyalties" numeric(78), "royaltiesReceiver" character(40), "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "counter" numeric(78) NOT NULL, "signature" text NOT NULL, "salt" text, "zone" text, "conduitKey" text, "protocolAddress" character(40), "cancelTxHash" character(64), "cancelLogIdx" numeric(78), "cancelTimestamp" TIMESTAMP, "fulfillQuantity" numeric(78) NOT NULL DEFAULT '0', "remainingQuantity" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_4930cae8caee19b4544501c2364" PRIMARY KEY ("hash"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0dee45ecf1a0f2555d4af76c97" ON "active_orders_cache" ("userAddress", "counter") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5180b06fa5d9657accb80de534" ON "active_orders_cache" ("userAddress", "collectionAddress") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f5ddc8c9d991bd95c56bc857c0" ON "active_orders_cache" ("collectionAddress", "startTime") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a80ef1486d5f1f906288f5356d" ON "active_orders_cache" ("collectionAddress", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe84aefba3e8423adbdd1a681f" ON "active_orders_cache" ("collectionAddress", "price") WHERE "type" = 'BID' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9')`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1f2cc9b4628ed724db73e3483" ON "active_orders_cache" ("collectionAddress", "price") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9')`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_2bfde47c481cca182def5607932" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_medias" ADD CONSTRAINT "FK_257d983ab65c845c466407acb33" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD CONSTRAINT "FK_5a9502e3dd5540b99b8a9270154" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ADD CONSTRAINT "FK_729615ba2ccd561e1c16766b2e1" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_63d21f3e4098e162b23be15e193" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" ADD CONSTRAINT "FK_737f403a0dc0349952989dff4b2" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_4d54235958f3b7b154936769387" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_f97ccd7fbfa124d7050e569cacc" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_4fb999f3466270b59cd0ff9b353" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_5e5ffd6165663fb307df283fc04" FOREIGN KEY ("orderHash") REFERENCES "orders"("hash") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_6aa9d2c843cdf72a5bd228f100d" FOREIGN KEY ("itemEntityCollectionAddress", "itemEntityTokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727" FOREIGN KEY ("referrerAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notable_collections" ADD CONSTRAINT "FK_b927dbd37a77ed934fcf53d185d" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hidden_items" ADD CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hidden_items" ADD CONSTRAINT "FK_a52786234de9b0d5b59e855049e" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_ranks" ADD CONSTRAINT "FK_3de617019fd4e649528fc62ec68" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_7a15f9a88d7509a5b0af5efa149" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_6d45b7fa23f8b41b22b3e02b1cb" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_716a446b06578c914ef61ad1fd6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_f07c0d5dd258518c077b53950f5" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_b4f631fbc35bf7c7efc352a11e4" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_c7bb9f86817eb5337f4ee3d0a2d" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_95975e653057a2427abc340630b" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_2e87b5bd4bf73a7a8c4aadf8147" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_3fbda6ed5d04c5f7309e0f1f4e6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_f5f789da993aa5276366a0a194d" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e72375a5ddde4bde7fe3a6958d8" FOREIGN KEY ("referrerTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "FK_0cece92ebcf29a89687133a476a" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_14259a4f20b9564c89f7a31ecce" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_7c72d748bbe2d7f65a5ba78ff83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_eeab1d978b265c55f80967bea83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_level_event" ADD CONSTRAINT "FK_4c5306e43cdc2fc79472f1c6fee" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_581b5643298f37eb2dc095d0d94" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_ccac340383b05000d610f79473f" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_10a4232b73f941c0df0ffe59676" FOREIGN KEY ("seasonNumber", "referenceQuestId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_223b6c526f41d87f1804d343f98" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_834299fbb41bacf21b118c79613" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_734f290d8be0311bbca0960870a" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_7bc7563040a22027efb5109f6be" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_3cad81a389dde43c39f76a831b3" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_global_leaderboard" ADD CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crews" ADD CONSTRAINT "FK_6a10bdf74fc88e7df1b32251e02" FOREIGN KEY ("owner") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD CONSTRAINT "FK_e210c66dc623cca1065d6c98eb4" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" ADD CONSTRAINT "FK_2016c331f10d8c6d7f32125ab31" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" ADD CONSTRAINT "FK_07accd2c97ad4cab9b5ddbeb072" FOREIGN KEY ("authorId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_09df9f3e6607190933a11e78baf" FOREIGN KEY ("levelId") REFERENCES "arena_chest_probability_genesis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_68fcfcdec85502e6278199c4c9b" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_stars_tracking" ADD CONSTRAINT "FK_58bcd278e1f4b72e0393d8e0d55" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_ac59388a0fc24654d00aeeeb03e" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_fe42e6e6b5b8dc4358f63600478" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_b662357f295888d181665193e68" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ADD CONSTRAINT "FK_86c55a1a06538cf396e4dbbd93a" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_afb6b41c7961ff5a2850c8943cc" FOREIGN KEY ("chestPeriod") REFERENCES "arena_wow_chest_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_81cefd74afdfb6782f323beda48" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_1a4a33bd2284590064dce62fa27" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD CONSTRAINT "FK_372f08cce6315ff748f0605db69" FOREIGN KEY ("address") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" ADD CONSTRAINT "FK_6dc3b9e60955c4273c6b325c16b" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" ADD CONSTRAINT "FK_4930cae8caee19b4544501c2364" FOREIGN KEY ("hash") REFERENCES "orders"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT EXISTS (SELECT 1 FROM "hidden_items" "hidden" WHERE "hidden"."userAddress" = "balance"."userAddress" AND "hidden"."collectionAddress" = "balance"."collectionAddress" AND "hidden"."tokenId" = "balance"."tokenId") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "hidden", (SELECT "item"."rarityScore" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityScore", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId" = ANY("buyNow"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("balance"."tokenId" = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId" = ANY("auction"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT EXISTS (SELECT 1 FROM "hidden_items" "hidden" WHERE "hidden"."userAddress" = "balance"."userAddress" AND "hidden"."collectionAddress" = "balance"."collectionAddress" AND "hidden"."tokenId" = "balance"."tokenId") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "hidden", (SELECT "item"."rarityScore" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityScore", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'7b79995e5f793a07bc00c21412e50ecae098e7f9\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId" = ANY("buyNow"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'7b79995e5f793a07bc00c21412e50ecae098e7f9\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("balance"."tokenId" = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'7b79995e5f793a07bc00c21412e50ecae098e7f9\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId" = ANY("auction"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable", (SELECT MAX("item"."rarityRanking") as "maxRarityRanking" FROM "items" "item" WHERE "item"."collectionAddress" = "collection"."address") AS "maxRarityRanking" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable", (SELECT MAX("item"."rarityRanking") as "maxRarityRanking" FROM "items" "item" WHERE "item"."collectionAddress" = "collection"."address") AS "maxRarityRanking" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", SUM(CASE WHEN EXISTS (SELECT "order".* FROM "active_orders_cache" "order" INNER JOIN (SELECT "orders_items"."hash", array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" GROUP BY "orders_items"."hash" HAVING "attribute"."tokenId" = ANY (array_agg("orders_items"."tokenId"))) "orders_items" ON "orders_items"."hash" = "order"."hash" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress") THEN 1 ELSE 0 END) AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attributes_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", SUM(CASE WHEN EXISTS (SELECT "order".* FROM "active_orders_cache" "order" INNER JOIN (SELECT "orders_items"."hash", array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" GROUP BY "orders_items"."hash" HAVING "attribute"."tokenId" = ANY (array_agg("orders_items"."tokenId"))) "orders_items" ON "orders_items"."hash" = "order"."hash" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress") THEN 1 ELSE 0 END) AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attribute_traits_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", COUNT(DISTINCT "attribute"."valueHash") AS "valueCount", COUNT(DISTINCT "attribute"."tokenId") AS "itemCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attribute_traits_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", COUNT(DISTINCT "attribute"."valueHash") AS "valueCount", COUNT(DISTINCT "attribute"."tokenId") AS "itemCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_balances_view',
        'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "distributor_rewards_view" AS SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "distributor_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'distributor_rewards_view',
        'SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "distributor_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."decimals" AS "decimals", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "items" "item" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId" = ANY("buyNow"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("item"."tokenId" = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId" = ANY("auction"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."price" DESC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'items_view',
        'SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."decimals" AS "decimals", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "items" "item" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'7b79995e5f793a07bc00c21412e50ecae098e7f9\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId" = ANY("buyNow"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'7b79995e5f793a07bc00c21412e50ecae098e7f9\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("item"."tokenId" = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'7b79995e5f793a07bc00c21412e50ecae098e7f9\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId" = ANY("auction"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."price" DESC',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_medias_view" AS SELECT "media"."id" AS "id", "media"."collectionAddress" AS "collectionAddress", "media"."tokenId" AS "tokenId", "media"."primary" AS "primary", "media"."raw" AS "raw" FROM "item_medias" "media"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_medias_view',
        'SELECT "media"."id" AS "id", "media"."collectionAddress" AS "collectionAddress", "media"."tokenId" AS "tokenId", "media"."primary" AS "primary", "media"."raw" AS "raw" FROM "item_medias" "media"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "item_attributes" "attribute"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "likes_view" AS SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "likes" "like"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'likes_view',
        'SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "likes" "like"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "active_orders_cache_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_orders_cache_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT EXISTS (SELECT 1, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT EXISTS (SELECT 1, (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "orders" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "reward_periods_view" AS SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "reward_periods" "period"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'reward_periods_view',
        'SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "reward_periods" "period"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "sales_view" AS SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "sales" "sale"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'sales_view',
        'SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "sales" "sale"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "active_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'ACTIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'ACTIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "passive_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'PASSIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'passive_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'PASSIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_harvests_view" AS SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_harvests_view',
        'SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."pool" AS "pool", "reward"."vestingTypeId" AS "vestingTypeId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."pool" AS "pool", "reward"."vestingTypeId" AS "vestingTypeId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_balances_view" AS SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "token_balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_balances_view',
        'SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "token_balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "token_transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "token_transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "transfers" "transfer"',
      ],
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_harvests_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_harvests_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'passive_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "passive_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sales_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sales_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'reward_periods_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "reward_periods_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_orders_cache_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_orders_cache_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'likes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "likes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_medias_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_medias_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'items_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'distributor_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attribute_traits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attribute_traits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" DROP CONSTRAINT "FK_4930cae8caee19b4544501c2364"`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" DROP CONSTRAINT "FK_6dc3b9e60955c4273c6b325c16b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP CONSTRAINT "FK_372f08cce6315ff748f0605db69"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_1a4a33bd2284590064dce62fa27"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_81cefd74afdfb6782f323beda48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_afb6b41c7961ff5a2850c8943cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" DROP CONSTRAINT "FK_86c55a1a06538cf396e4dbbd93a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_b662357f295888d181665193e68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_fe42e6e6b5b8dc4358f63600478"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_ac59388a0fc24654d00aeeeb03e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_stars_tracking" DROP CONSTRAINT "FK_58bcd278e1f4b72e0393d8e0d55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_68fcfcdec85502e6278199c4c9b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_09df9f3e6607190933a11e78baf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" DROP CONSTRAINT "FK_07accd2c97ad4cab9b5ddbeb072"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP CONSTRAINT "FK_2016c331f10d8c6d7f32125ab31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_progress" DROP CONSTRAINT "FK_e210c66dc623cca1065d6c98eb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crews" DROP CONSTRAINT "FK_6a10bdf74fc88e7df1b32251e02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_global_leaderboard" DROP CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_3cad81a389dde43c39f76a831b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_7bc7563040a22027efb5109f6be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_734f290d8be0311bbca0960870a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_834299fbb41bacf21b118c79613"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_223b6c526f41d87f1804d343f98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_10a4232b73f941c0df0ffe59676"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_ccac340383b05000d610f79473f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_581b5643298f37eb2dc095d0d94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_level_event" DROP CONSTRAINT "FK_4c5306e43cdc2fc79472f1c6fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_eeab1d978b265c55f80967bea83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_7c72d748bbe2d7f65a5ba78ff83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_14259a4f20b9564c89f7a31ecce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "FK_0cece92ebcf29a89687133a476a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e72375a5ddde4bde7fe3a6958d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_f5f789da993aa5276366a0a194d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_3fbda6ed5d04c5f7309e0f1f4e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_2e87b5bd4bf73a7a8c4aadf8147"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_95975e653057a2427abc340630b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_c7bb9f86817eb5337f4ee3d0a2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_b4f631fbc35bf7c7efc352a11e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_f07c0d5dd258518c077b53950f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_716a446b06578c914ef61ad1fd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_6d45b7fa23f8b41b22b3e02b1cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_7a15f9a88d7509a5b0af5efa149"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_ranks" DROP CONSTRAINT "FK_3de617019fd4e649528fc62ec68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hidden_items" DROP CONSTRAINT "FK_a52786234de9b0d5b59e855049e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hidden_items" DROP CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notable_collections" DROP CONSTRAINT "FK_b927dbd37a77ed934fcf53d185d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "FK_6aa9d2c843cdf72a5bd228f100d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "FK_5e5ffd6165663fb307df283fc04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "FK_4fb999f3466270b59cd0ff9b353"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "FK_f97ccd7fbfa124d7050e569cacc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_4d54235958f3b7b154936769387"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" DROP CONSTRAINT "FK_737f403a0dc0349952989dff4b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_63d21f3e4098e162b23be15e193"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" DROP CONSTRAINT "FK_729615ba2ccd561e1c16766b2e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP CONSTRAINT "FK_5a9502e3dd5540b99b8a9270154"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_medias" DROP CONSTRAINT "FK_257d983ab65c845c466407acb33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_2bfde47c481cca182def5607932"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1f2cc9b4628ed724db73e3483"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe84aefba3e8423adbdd1a681f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a80ef1486d5f1f906288f5356d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f5ddc8c9d991bd95c56bc857c0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5180b06fa5d9657accb80de534"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0dee45ecf1a0f2555d4af76c97"`,
    );
    await queryRunner.query(`DROP TABLE "active_orders_cache"`);
    await queryRunner.query(`DROP TYPE "public"."marketplace"`);
    await queryRunner.query(`DROP TYPE "public"."order_type"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_372f08cce6315ff748f0605db6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f8aa2834ec0fbeee533eebc1ea"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5b8893e59fda1cee1b2508e1d1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_508017d641b5f3f0b89cc84d0a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22bc22d06378750c6891970cfa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_404b0993f307ab4ecc1eb240cb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e33af69bf81bef914cf9758a12"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6aacdfc6997c3a8c665c97f9b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1823d008c8023b6b0a589b10c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be3febb756fbf3bc6d618dd845"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ed9f478f54b494990997ba425"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_80dc012d87c3e3261a1a0dcc2b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d9ba0151823fdcd100d0f81536"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6688ed0ceb82e95f6975e14a3e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ca00a94c02dba69e5605367472"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf7a5708a0d32c91f98799c174"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c1bc78ebd9cecc7dca6793060"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21347659be38cc7a878e871bc3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_361ac95dbd56e20dbd9d6f93ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c3f1edde9e36fbca871819f861"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1872fcd12e98ec90278c5d34d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4cb243afbbf4bc1497f9d9550a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d95951c6f13359e9bc2a49bed1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d57698ba1c360dbe7e04d7b382"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f5ed5354eebf6979cdbed0deb0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4259a6b20b2c613de99daf44d7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2bcbb453635cf8b1296e76df4e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa8ebee98ce8a49f619362c453"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_024347fcfc9d8e48f9c65705d8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce8a640bfd03f32da7436dc06c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_260239fda621a869ade81670cf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f69bf6b8e5aa033c2039c652e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cbb6ec802cc6619ede1e468ae8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a90030b5aeb0928bcdcc55cf19"`,
    );
    await queryRunner.query(`DROP TABLE "collection_rankings_cache"`);
    await queryRunner.query(`DROP TABLE "arena_admins"`);
    await queryRunner.query(`DROP TABLE "arena_crew_chest_points"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d88598a9b134a17250fd0761fd"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_booster"`);
    await queryRunner.query(`DROP TYPE "public"."booster_type"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3e6c6386c1872b76c624596129"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_claimed_wow_chest"`);
    await queryRunner.query(`DROP TABLE "arena_wow_chest_period"`);
    await queryRunner.query(`DROP TABLE "arena_wow_chest_probability"`);
    await queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_86c55a1a06538cf396e4dbbd93"`,
    );
    await queryRunner.query(`DROP TABLE "arena_user_stars_tracking"`);
    await queryRunner.query(`DROP TABLE "arena_spaace_onboarding_tweet_likes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7fee30aff1fe8f6877383958a4"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_quest_progress"`);
    await queryRunner.query(`DROP TABLE "arena_crew_stars_tracking"`);
    await queryRunner.query(`DROP TABLE "arena_users_chest_progress_genesis"`);
    await queryRunner.query(`DROP TABLE "arena_seasons_chest_genesis"`);
    await queryRunner.query(`DROP TABLE "arena_chest_probability_genesis"`);
    await queryRunner.query(`DROP TABLE "arena_chest_points_genesis"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0810a60411cef26ad2362748e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_07accd2c97ad4cab9b5ddbeb07"`,
    );
    await queryRunner.query(`DROP TABLE "arena_tweet"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce88aedfa102b3525512e21c86"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c85ab52359178efe108bec82aa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d02aaa5d3b3eda8e962da3a938"`,
    );
    await queryRunner.query(`DROP TABLE "arena_spaace_tweet"`);
    await queryRunner.query(`DROP TABLE "arena_crons"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c511f9ef0a4a2e41cec14153df"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_46ba2feb436b75b81849164b9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84bde20a3cea54eb69312a7868"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_progress"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_53feb0270ffc58e7ed5f1f0ae4"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crews"`);
    await queryRunner.query(`DROP TABLE "arena_crew_leaderboard"`);
    await queryRunner.query(`DROP TABLE "arena_global_leaderboard"`);
    await queryRunner.query(`DROP TABLE "arena_user_statistics"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b24ff8e11120eba8598149a0b"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_earned_chest"`);
    await queryRunner.query(`DROP TABLE "arena_seasons_chest"`);
    await queryRunner.query(`DROP TYPE "public"."arena_divison_name"`);
    await queryRunner.query(`DROP TABLE "arena_levels"`);
    await queryRunner.query(`DROP TABLE "arena_chest_points"`);
    await queryRunner.query(`DROP TYPE "public"."arena_chest_name"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3cd5e9a2a6827f571ad6d7da60"`,
    );
    await queryRunner.query(`DROP TABLE "arena_quest_progress"`);
    await queryRunner.query(`DROP TABLE "arena_quests"`);
    await queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type"`);
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
    await queryRunner.query(`DROP TYPE "public"."loyalty_rank"`);
    await queryRunner.query(`DROP TYPE "public"."quest_period"`);
    await queryRunner.query(`DROP TABLE "arena_user_level_event"`);
    await queryRunner.query(`DROP TABLE "arena_leagues"`);
    await queryRunner.query(`DROP TABLE "arena_divisions"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d4472d06a5fac99cd2361b28cc"`,
    );
    await queryRunner.query(`DROP TABLE "arena_seasons"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0bf4352e67a4f9082b2d879390"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9d28e5a1d308eeba7eb74223b3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_adbe3f13cde72d3e0e59cc2745"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_progress"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0cece92ebcf29a89687133a476"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6116a28ce34f6bcb2fb3735f5a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5369e233e18e92fecb08b7991a"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users"`);
    await queryRunner.query(`DROP TABLE "reports"`);
    await queryRunner.query(`DROP TYPE "public"."report_reason"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd8b4ee8d658dbbc0a9360f28b"`,
    );
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(`DROP TABLE "cart_items"`);
    await queryRunner.query(`DROP TABLE "user_season_rank_claims"`);
    await queryRunner.query(`DROP TYPE "public"."rank"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ef2260573a9244e2eb7208341"`,
    );
    await queryRunner.query(`DROP TABLE "user_quest_progress"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70dee80d600300da49dd4d1e34"`,
    );
    await queryRunner.query(`DROP TABLE "user_loyalties"`);
    await queryRunner.query(`DROP TABLE "quests"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed3f26097caa408923b69e5ab2"`,
    );
    await queryRunner.query(`DROP TABLE "season_ranks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7e703d89736f55eee5b6fa68c2"`,
    );
    await queryRunner.query(`DROP TABLE "seasons"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c84aeceb104a1a0f0e923e1ab1"`,
    );
    await queryRunner.query(`DROP TABLE "hidden_items"`);
    await queryRunner.query(`DROP TABLE "notable_collections"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "login_nonces"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ceaf9a1e2286ed3b7ac7b3e6a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1316a9334a23e5c5b1b180e32"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce4b762f4246205df79d7c0d29"`,
    );
    await queryRunner.query(`DROP TABLE "orders_items"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b6c737c16b17e9b2b2868e9e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed5303e883ab8bda04aeda2564"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8015da564b715d467c36eb4cfb"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "reward_periods"`);
    await queryRunner.query(`DROP TYPE "public"."distributor_contract"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12796feacc86a1415cb0828d0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f54ad337df477893cd474b5b7"`,
    );
    await queryRunner.query(`DROP TABLE "distributor_rewards"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a4d4751963a565d8085df2759"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b7195f977f51ee35c43cda5000"`,
    );
    await queryRunner.query(`DROP TABLE "token_balances"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4859f158ae3d83ed963fd88e9b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5037fb0b2a13ac921c73a05492"`,
    );
    await queryRunner.query(`DROP TABLE "balances"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2549ba360e748e384808519f3"`,
    );
    await queryRunner.query(`DROP TABLE "staking_rewards"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ada1107b0f23186413bec8efcf"`,
    );
    await queryRunner.query(`DROP TABLE "staking_harvests"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c53bae28da13037f9a0b91ea2d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c866abee7aaf01b4f6a6d6f006"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41126261e9a22d2405c6ebde64"`,
    );
    await queryRunner.query(`DROP TABLE "staking_deposits"`);
    await queryRunner.query(`DROP TYPE "public"."staking_type"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0558657f578aa1eee221654227"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2c4359130e7be0d1b845c418b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7b9e171cf268ba8a046a7880ef"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9d68251a8e87059a9f7988f3fe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f7931cf6fcf04f0899ff8a2405"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_134cc4bb09e09430239513a907"`,
    );
    await queryRunner.query(`DROP TABLE "sales"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6446d8f923c6a64337de94a4f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6ad30b2019d8c3c912e8ebcbad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_48ff10123de1f12ad97d9389ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_949ca1a8640dba9fde696bc9ed"`,
    );
    await queryRunner.query(`DROP TABLE "transfers"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1866bd8ac2446df677ded46be6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a9502e3dd5540b99b8a927015"`,
    );
    await queryRunner.query(`DROP TABLE "item_attributes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e22a1534050888010eb130fb1a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d05b0895c77fadc66c6c6df74d"`,
    );
    await queryRunner.query(`DROP TABLE "item_medias"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_77a2ad67a01059ccd7e3b6df3e"`,
    );
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "collections"`);
    await queryRunner.query(`DROP TYPE "public"."collection_type"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e4c29e58b1e24afe6a420eac12"`,
    );
    await queryRunner.query(`DROP TABLE "token_transfers"`);
    await queryRunner.query(`DROP TABLE "last_refresh"`);
    await queryRunner.query(`DROP TABLE "latest_block"`);
  }
}
