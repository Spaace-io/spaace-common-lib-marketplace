import { MigrationInterface, QueryRunner } from 'typeorm';

export class AirdropChests1750687220419 implements MigrationInterface {
  name = 'AirdropChests1750687220419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the custom enum type for airdrop chests
    await queryRunner.query(`
            CREATE TYPE "airdrop_chests_type" AS ENUM ('Mythic', 'Legendary', 'Rare', 'Uncommon', 'Common')
        `);

    // Create the airdrop_chests table
    await queryRunner.query(`
            CREATE TABLE "airdrop_chests" (
                "id" SERIAL NOT NULL, 
                "name" "airdrop_chests_type" NOT NULL, 
                "valueXp" integer NOT NULL, 
                CONSTRAINT "PK_airdrop_chests_id" PRIMARY KEY ("id")
            )
        `);

    // Insert the 5 predefined records for airdrop_chests
    await queryRunner.query(`
            INSERT INTO "airdrop_chests" ("id", "name", "valueXp") VALUES 
            (1, 'Mythic', 4500),
            (2, 'Legendary', 1500),
            (3, 'Rare', 500),
            (4, 'Uncommon', 100),
            (5, 'Common', 50)
        `);

    // Set the sequence to start from 6 for future inserts
    await queryRunner.query(`SELECT setval('airdrop_chests_id_seq', 5, true)`);

    // Create the custom enum type for airdrop tiers
    await queryRunner.query(`
            CREATE TYPE "airdrop_tiers_name" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3', 'TIER_4', 'TIER_5', 'TIER_6', 'TIER_7', 'TIER_8', 'TIER_9', 'TIER_10', 'TIER_11', 'TIER_12', 'TIER_13', 'TIER_14', 'TIER_15')
        `);

    // Create the airdrop_tiers table
    await queryRunner.query(`
            CREATE TABLE "airdrop_tiers" (
                "id" SERIAL NOT NULL, 
                "name" "airdrop_tiers_name" NOT NULL, 
                "totalXp" integer NOT NULL,
                "totalChestsCount" integer NOT NULL, 
                CONSTRAINT "PK_airdrop_tiers_id" PRIMARY KEY ("id")
            )
        `);

    // Insert the 15 predefined records for airdrop_tiers
    await queryRunner.query(`
            INSERT INTO "airdrop_tiers" ("id", "name", "totalXp", "totalChestsCount") VALUES 
            (1, 'TIER_1', 45500, 21),
            (2, 'TIER_2', 36500, 15),
            (3, 'TIER_3', 32000, 14),
            (4, 'TIER_4', 29500, 11),
            (5, 'TIER_5', 26000, 12),
            (6, 'TIER_6', 22000, 8),
            (7, 'TIER_7', 21000, 10),
            (8, 'TIER_8', 19000, 10),
            (9, 'TIER_9', 16900, 13),
            (10, 'TIER_10', 14200, 12),
            (11, 'TIER_11', 13500, 15),
            (12, 'TIER_12', 10500, 13),
            (13, 'TIER_13', 8700, 10),
            (14, 'TIER_14', 4800, 9),
            (15, 'TIER_15', 3200, 7)
        `);

    // Set the sequence to start from 16 for future inserts
    await queryRunner.query(`SELECT setval('airdrop_tiers_id_seq', 15, true)`);

    // Create the airdrop_tiers_delivery_rules table
    await queryRunner.query(`
            CREATE TABLE "airdrop_tiers_delivery_rules" (
                "id" SERIAL NOT NULL, 
                "tierId" integer NOT NULL, 
                "chestId" integer NOT NULL,
                "count" integer NOT NULL, 
                CONSTRAINT "PK_airdrop_tiers_delivery_rules_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_airdrop_tiers_delivery_rules_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_airdrop_tiers_delivery_rules_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

    // Insert the delivery rules for each tier
    await queryRunner.query(`
            INSERT INTO "airdrop_tiers_delivery_rules" ("tierId", "chestId", "count") VALUES 
            -- TIER_1: 7 Mythic, 7 Legendary, 7 Rare
            (1, 1, 7), (1, 2, 7), (1, 3, 7),
            -- TIER_2: 6 Mythic, 5 Legendary, 4 Rare
            (2, 1, 6), (2, 2, 5), (2, 3, 4),
            -- TIER_3: 5 Mythic, 5 Legendary, 4 Rare
            (3, 1, 5), (3, 2, 5), (3, 3, 4),
            -- TIER_4: 5 Mythic, 4 Legendary, 2 Rare
            (4, 1, 5), (4, 2, 4), (4, 3, 2),
            -- TIER_5: 4 Mythic, 4 Legendary, 4 Rare
            (5, 1, 4), (5, 2, 4), (5, 3, 4),
            -- TIER_6: 4 Mythic, 2 Legendary, 2 Rare
            (6, 1, 4), (6, 2, 2), (6, 3, 2),
            -- TIER_7: 3 Mythic, 4 Legendary, 3 Rare
            (7, 1, 3), (7, 2, 4), (7, 3, 3),
            -- TIER_8: 2 Mythic, 6 Legendary, 2 Rare
            (8, 1, 2), (8, 2, 6), (8, 3, 2),
            -- TIER_9: 2 Mythic, 4 Legendary, 3 Rare, 4 Uncommon
            (9, 1, 2), (9, 2, 4), (9, 3, 3), (9, 4, 4),
            -- TIER_10: 2 Mythic, 1 Legendary, 7 Rare, 2 Uncommon
            (10, 1, 2), (10, 2, 1), (10, 3, 7), (10, 4, 2),
            -- TIER_11: 1 Mythic, 4 Legendary, 5 Rare, 5 Uncommon
            (11, 1, 1), (11, 2, 4), (11, 3, 5), (11, 4, 5),
            -- TIER_12: 1 Mythic, 3 Legendary, 2 Rare, 3 Uncommon, 4 Common
            (12, 1, 1), (12, 2, 3), (12, 3, 2), (12, 4, 3), (12, 5, 4),
            -- TIER_13: 5 Legendary, 2 Rare, 1 Uncommon, 2 Common
            (13, 2, 5), (13, 3, 2), (13, 4, 1), (13, 5, 2),
            -- TIER_14: 2 Legendary, 3 Rare, 2 Uncommon, 2 Common
            (14, 2, 2), (14, 3, 3), (14, 4, 2), (14, 5, 2),
            -- TIER_15: 1 Legendary, 3 Rare, 1 Uncommon, 2 Common
            (15, 2, 1), (15, 3, 3), (15, 4, 1), (15, 5, 2)
        `);

    // Create the airdrop_users table
    await queryRunner.query(`
            CREATE TABLE "airdrop_users" (
                "id" SERIAL NOT NULL, 
                "address" character varying NOT NULL, 
                "tierId" integer NOT NULL, 
                CONSTRAINT "PK_airdrop_users_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_airdrop_users_address" UNIQUE ("address"),
                CONSTRAINT "FK_airdrop_users_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

    // Create index on address for faster lookups
    await queryRunner.query(
      `CREATE INDEX "IDX_airdrop_users_address" ON "airdrop_users" ("address")`,
    );

    // Create the custom enum type for users chests status
    await queryRunner.query(`
            CREATE TYPE "users_chests_status" AS ENUM ('LOCKED', 'UNLOCKED', 'CLAIMABLE')
        `);

    // Create the airdrop_users_chests table
    await queryRunner.query(`
            CREATE TABLE "airdrop_users_chests" (
                "id" SERIAL NOT NULL, 
                "address" character varying NOT NULL, 
                "chestId" integer NOT NULL,
                "status" "users_chests_status" NOT NULL DEFAULT 'LOCKED', 
                CONSTRAINT "PK_airdrop_users_chests_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_airdrop_users_chests_address" FOREIGN KEY ("address") REFERENCES "airdrop_users"("address") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_airdrop_users_chests_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

    // Create indexes for faster lookups
    await queryRunner.query(
      `CREATE INDEX "IDX_airdrop_users_chests_address" ON "airdrop_users_chests" ("address")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_airdrop_users_chests_status" ON "airdrop_users_chests" ("status")`,
    );

    // Create the airdrop_tiers_unlocking table
    await queryRunner.query(`
            CREATE TABLE "airdrop_tiers_unlocking" (
                "id" SERIAL NOT NULL, 
                "tierId" integer NOT NULL, 
                "rank" "rank" NOT NULL,
                "chestId" integer NOT NULL,
                "chestCount" integer NOT NULL, 
                CONSTRAINT "PK_airdrop_tiers_unlocking_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_airdrop_tiers_unlocking_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_airdrop_tiers_unlocking_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

    // Insert the unlocking rules for all tiers and ranks
    await queryRunner.query(`
            INSERT INTO "airdrop_tiers_unlocking" ("tierId", "rank", "chestId", "chestCount") VALUES 
            -- TIER_1 BRONZE_3: 1 Mythic, 3 Legendary, 3 Rare
            (1, 'BRONZE_3', 1, 1), (1, 'BRONZE_3', 2, 3), (1, 'BRONZE_3', 3, 3),
            -- TIER_1 SILVER_1: 3 Mythic, 2 Legendary, 1 Rare
            (1, 'SILVER_1', 1, 3), (1, 'SILVER_1', 2, 2), (1, 'SILVER_1', 3, 1),
            -- TIER_1 GOLD_3: 3 Mythic, 2 Legendary, 3 Rare
            (1, 'GOLD_3', 1, 3), (1, 'GOLD_3', 2, 2), (1, 'GOLD_3', 3, 3),
            
            -- TIER_2 BRONZE_3: 1 Mythic, 2 Legendary, 3 Rare
            (2, 'BRONZE_3', 1, 1), (2, 'BRONZE_3', 2, 2), (2, 'BRONZE_3', 3, 3),
            -- TIER_2 SILVER_1: 3 Mythic, 1 Legendary, 1 Rare
            (2, 'SILVER_1', 1, 3), (2, 'SILVER_1', 2, 1), (2, 'SILVER_1', 3, 1),
            -- TIER_2 GOLD_3: 2 Mythic, 2 Legendary
            (2, 'GOLD_3', 1, 2), (2, 'GOLD_3', 2, 2),
            
            -- TIER_3 BRONZE_3: 1 Mythic, 2 Legendary, 1 Rare
            (3, 'BRONZE_3', 1, 1), (3, 'BRONZE_3', 2, 2), (3, 'BRONZE_3', 3, 1),
            -- TIER_3 SILVER_1: 2 Mythic, 2 Legendary, 2 Rare
            (3, 'SILVER_1', 1, 2), (3, 'SILVER_1', 2, 2), (3, 'SILVER_1', 3, 2),
            -- TIER_3 GOLD_3: 2 Mythic, 1 Legendary, 1 Rare
            (3, 'GOLD_3', 1, 2), (3, 'GOLD_3', 2, 1), (3, 'GOLD_3', 3, 1),
            
            -- TIER_4 BRONZE_3: 1 Mythic, 1 Legendary, 2 Rare
            (4, 'BRONZE_3', 1, 1), (4, 'BRONZE_3', 2, 1), (4, 'BRONZE_3', 3, 2),
            -- TIER_4 SILVER_1: 2 Mythic, 2 Legendary
            (4, 'SILVER_1', 1, 2), (4, 'SILVER_1', 2, 2),
            -- TIER_4 GOLD_3: 2 Mythic, 1 Legendary
            (4, 'GOLD_3', 1, 2), (4, 'GOLD_3', 2, 1),
            
            -- TIER_5 BRONZE_3: 1 Mythic, 1 Legendary, 1 Rare
            (5, 'BRONZE_3', 1, 1), (5, 'BRONZE_3', 2, 1), (5, 'BRONZE_3', 3, 1),
            -- TIER_5 SILVER_1: 2 Mythic, 1 Legendary, 2 Rare
            (5, 'SILVER_1', 1, 2), (5, 'SILVER_1', 2, 1), (5, 'SILVER_1', 3, 2),
            -- TIER_5 GOLD_3: 1 Mythic, 2 Legendary, 1 Rare
            (5, 'GOLD_3', 1, 1), (5, 'GOLD_3', 2, 2), (5, 'GOLD_3', 3, 1),
            
            -- TIER_6 BRONZE_3: 1 Mythic, 1 Legendary
            (6, 'BRONZE_3', 1, 1), (6, 'BRONZE_3', 2, 1),
            -- TIER_6 SILVER_1: 2 Mythic, 1 Rare
            (6, 'SILVER_1', 1, 2), (6, 'SILVER_1', 3, 1),
            -- TIER_6 GOLD_3: 1 Mythic, 1 Legendary, 1 Rare
            (6, 'GOLD_3', 1, 1), (6, 'GOLD_3', 2, 1), (6, 'GOLD_3', 3, 1),
            
            -- TIER_7 BRONZE_3: 1 Mythic, 1 Rare
            (7, 'BRONZE_3', 1, 1), (7, 'BRONZE_3', 3, 1),
            -- TIER_7 SILVER_1: 1 Mythic, 3 Legendary, 1 Rare
            (7, 'SILVER_1', 1, 1), (7, 'SILVER_1', 2, 3), (7, 'SILVER_1', 3, 1),
            -- TIER_7 GOLD_3: 1 Mythic, 1 Legendary, 1 Rare
            (7, 'GOLD_3', 1, 1), (7, 'GOLD_3', 2, 1), (7, 'GOLD_3', 3, 1),
            
            -- TIER_8 BRONZE_3: 3 Legendary
            (8, 'BRONZE_3', 2, 3),
            -- TIER_8 SILVER_1: 1 Mythic, 2 Legendary, 1 Rare
            (8, 'SILVER_1', 1, 1), (8, 'SILVER_1', 2, 2), (8, 'SILVER_1', 3, 1),
            -- TIER_8 GOLD_3: 1 Mythic, 1 Legendary, 1 Rare
            (8, 'GOLD_3', 1, 1), (8, 'GOLD_3', 2, 1), (8, 'GOLD_3', 3, 1),
            
            -- TIER_9 BRONZE_3: 2 Legendary, 2 Rare, 1 Uncommon
            (9, 'BRONZE_3', 2, 2), (9, 'BRONZE_3', 3, 2), (9, 'BRONZE_3', 4, 1),
            -- TIER_9 SILVER_1: 1 Mythic, 1 Legendary, 1 Rare, 1 Uncommon
            (9, 'SILVER_1', 1, 1), (9, 'SILVER_1', 2, 1), (9, 'SILVER_1', 3, 1), (9, 'SILVER_1', 4, 1),
            -- TIER_9 GOLD_3: 1 Mythic, 1 Legendary, 1 Uncommon, 2 Common
            (9, 'GOLD_3', 1, 1), (9, 'GOLD_3', 2, 1), (9, 'GOLD_3', 4, 1), (9, 'GOLD_3', 5, 2),
            
            -- TIER_10 BRONZE_3: 1 Legendary, 3 Rare, 2 Uncommon
            (10, 'BRONZE_3', 2, 1), (10, 'BRONZE_3', 3, 3), (10, 'BRONZE_3', 4, 2),
            -- TIER_10 SILVER_1: 1 Mythic, 3 Rare
            (10, 'SILVER_1', 1, 1), (10, 'SILVER_1', 3, 3),
            -- TIER_10 GOLD_3: 1 Mythic, 1 Rare
            (10, 'GOLD_3', 1, 1), (10, 'GOLD_3', 3, 1),
            
            -- TIER_11 BRONZE_3: 1 Legendary, 3 Rare, 3 Uncommon
            (11, 'BRONZE_3', 2, 1), (11, 'BRONZE_3', 3, 3), (11, 'BRONZE_3', 4, 3),
            -- TIER_11 SILVER_1: 1 Rare, 1 Uncommon
            (11, 'SILVER_1', 3, 1), (11, 'SILVER_1', 4, 1),
            -- TIER_11 GOLD_3: 3 Legendary, 1 Rare, 1 Uncommon
            (11, 'GOLD_3', 2, 3), (11, 'GOLD_3', 3, 1), (11, 'GOLD_3', 4, 1),
            
            -- TIER_12 BRONZE_3: 1 Legendary, 1 Rare, 2 Uncommon
            (12, 'BRONZE_3', 2, 1), (12, 'BRONZE_3', 3, 1), (12, 'BRONZE_3', 4, 2),
            -- TIER_12 SILVER_1: 1 Mythic, 1 Uncommon, 1 Common
            (12, 'SILVER_1', 1, 1), (12, 'SILVER_1', 4, 1), (12, 'SILVER_1', 5, 1),
            -- TIER_12 GOLD_3: 2 Legendary, 1 Rare, 1 Common
            (12, 'GOLD_3', 2, 2), (12, 'GOLD_3', 3, 1), (12, 'GOLD_3', 5, 1),
            
            -- TIER_13 BRONZE_3: 1 Legendary, 1 Rare, 2 Common
            (13, 'BRONZE_3', 2, 1), (13, 'BRONZE_3', 3, 1), (13, 'BRONZE_3', 5, 2),
            -- TIER_13 SILVER_1: 2 Legendary, 1 Uncommon, 1 Common
            (13, 'SILVER_1', 2, 2), (13, 'SILVER_1', 4, 1), (13, 'SILVER_1', 5, 1),
            -- TIER_13 GOLD_3: 2 Legendary, 1 Common
            (13, 'GOLD_3', 2, 2), (13, 'GOLD_3', 5, 1),
            
            -- TIER_14 BRONZE_3: 2 Legendary, 1 Common
            (14, 'BRONZE_3', 2, 2), (14, 'BRONZE_3', 5, 1),
            -- TIER_14 SILVER_1: 1 Rare, 1 Uncommon, 1 Common
            (14, 'SILVER_1', 3, 1), (14, 'SILVER_1', 4, 1), (14, 'SILVER_1', 5, 1),
            -- TIER_14 GOLD_3: 2 Rare, 1 Uncommon
            (14, 'GOLD_3', 3, 2), (14, 'GOLD_3', 4, 1),
            
            -- TIER_15 BRONZE_3: 1 Rare, 1 Uncommon, 2 Common
            (15, 'BRONZE_3', 3, 1), (15, 'BRONZE_3', 4, 1), (15, 'BRONZE_3', 5, 2),
            -- TIER_15 SILVER_1: 2 Rare
            (15, 'SILVER_1', 3, 2),
            -- TIER_15 GOLD_3: 1 Legendary, 1 Rare
            (15, 'GOLD_3', 2, 1), (15, 'GOLD_3', 3, 1)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "airdrop_tiers_unlocking"`);
    await queryRunner.query(`DROP TABLE "airdrop_users_chests"`);
    await queryRunner.query(`DROP TYPE "users_chests_status"`);
    await queryRunner.query(`DROP TABLE "airdrop_users"`);
    await queryRunner.query(`DROP TABLE "airdrop_tiers_delivery_rules"`);
    await queryRunner.query(`DROP TABLE "airdrop_tiers"`);
    await queryRunner.query(`DROP TYPE "airdrop_tiers_name"`);
    await queryRunner.query(`DROP TABLE "airdrop_chests"`);
    await queryRunner.query(`DROP TYPE "airdrop_chests_type"`);
  }
}
