import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1763133781574 implements MigrationInterface {
  name = 'Migrations1763133781574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "checkedAirdropOpenseaChapter1" boolean NOT NULL DEFAULT false`,
    );

    /**
     * OPENSEA AIRDROP DATA
     */
    // Create the custom enum type for airdrop chests
    await queryRunner.query(`
      CREATE TYPE "airdrop_chests_type_opensea_chapter1" AS ENUM ('Mythic', 'Legendary', 'Epic', 'Rare', 'Common')
  `);

    // Create the airdrop_chests table
    await queryRunner.query(`
      CREATE TABLE "airdrop_chests_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_chests_type_opensea_chapter1" NOT NULL, 
          "valueXp" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_chests_opensea_chapter1_id" PRIMARY KEY ("id")
      )
  `);

    // Insert the 5 predefined records for airdrop_chests
    await queryRunner.query(`
      INSERT INTO "airdrop_chests_opensea_chapter1" ("id", "name", "valueXp") VALUES 
      (1, 'Mythic', 6000),
      (2, 'Legendary', 1500),
      (3, 'Epic', 500),
      (4, 'Rare', 100),
      (5, 'Common', 50)
  `);

    // Set the sequence to start from 6 for future inserts
    await queryRunner.query(
      `SELECT setval('airdrop_chests_opensea_chapter1_id_seq', 5, true)`,
    );

    // Create the custom enum type for airdrop tiers
    await queryRunner.query(`
      CREATE TYPE "airdrop_tiers_name_opensea_chapter1" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3', 'TIER_4', 'TIER_5', 'TIER_6', 'TIER_7', 'TIER_8', 'TIER_9', 'TIER_10', 'TIER_11', 'TIER_12', 'TIER_13', 'TIER_14', 'TIER_15')
  `);

    // Create the airdrop_tiers table
    await queryRunner.query(`
      CREATE TABLE "airdrop_tiers_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_tiers_name_opensea_chapter1" NOT NULL, 
          "totalXp" integer NOT NULL,
          "totalChestsCount" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_opensea_chapter1_id" PRIMARY KEY ("id")
      )
  `);

    // Insert the 15 predefined records for airdrop_tiers
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_opensea_chapter1" ("id", "name", "totalXp", "totalChestsCount") VALUES 
      (1, 'TIER_1', 80000, 30),
      (2, 'TIER_2', 61500, 21),
      (3, 'TIER_3', 56000, 21),
      (4, 'TIER_4', 48000, 18),
      (5, 'TIER_5', 42500, 18),
      (6, 'TIER_6', 36500, 12),
      (7, 'TIER_7', 33000, 12),
      (8, 'TIER_8', 29000, 13),
      (9, 'TIER_9', 19900, 13),
      (10, 'TIER_10', 17200, 12),
      (11, 'TIER_11', 15000, 15),
      (12, 'TIER_12', 12300, 12),
      (13, 'TIER_13', 9400, 14),
      (14, 'TIER_14', 5000, 12),
      (15, 'TIER_15', 3200, 7)
  `);

    // Set the sequence to start from 16 for future inserts
    await queryRunner.query(
      `SELECT setval('airdrop_tiers_opensea_chapter1_id_seq', 15, true)`,
    );

    // Create the airdrop_tiers_delivery_rules table
    await queryRunner.query(`
      CREATE TABLE "airdrop_tiers_delivery_rules_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "tierId" integer NOT NULL, 
          "chestId" integer NOT NULL,
          "count" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_delivery_rules_opensea_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "FK_airdrop_tiers_delivery_rules_opensea_chapter1_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_opensea_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
          CONSTRAINT "FK_airdrop_tiers_delivery_rules_opensea_chapter1_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_opensea_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);

    // Insert the delivery rules for each tier
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_delivery_rules_opensea_chapter1" ("tierId", "chestId", "count") VALUES 
      -- TIER_1: 10 Mythic, 10 Legendary, 10 Epic
      (1, 1, 10), (1, 2, 10), (1, 3, 10),
      -- TIER_2: 8 Mythic, 7 Legendary, 6 Epic
      (2, 1, 8), (2, 2, 7), (2, 3, 6),
      -- TIER_3: 7 Mythic, 7 Legendary, 7 Epic
      (3, 1, 7), (3, 2, 7), (3, 3, 7),
      -- TIER_4: 6 Mythic, 6 Legendary, 6 Epic
      (4, 1, 6), (4, 2, 6), (4, 3, 6),
      -- TIER_5: 5 Mythic, 6 Legendary, 7 Epic
      (5, 1, 5), (5, 2, 6), (5, 3, 7),
      -- TIER_6: 5 Mythic, 3 Legendary, 4 Epic
      (6, 1, 5), (6, 2, 3), (6, 3, 4),
      -- TIER_7: 4 Mythic, 5 Legendary, 3 Epic
      (7, 1, 4), (7, 2, 5), (7, 3, 3),
      -- TIER_8: 3 Mythic, 6 Legendary, 4 Epic
      (8, 1, 3), (8, 2, 6), (8, 3, 4),
      -- TIER_9: 2 Mythic, 4 Legendary, 3 Epic, 4 Rare
      (9, 1, 2), (9, 2, 4), (9, 3, 3), (9, 4, 4),
      -- TIER_10: 2 Mythic, 1 Legendary, 7 Epic, 2 Rare
      (10, 1, 2), (10, 2, 1), (10, 3, 7), (10, 4, 2),
      -- TIER_11: 1 Mythic, 4 Legendary, 5 Epic, 5 Rare
      (11, 1, 1), (11, 2, 4), (11, 3, 5), (11, 4, 5),
      -- TIER_12: 1 Mythic, 2 Legendary, 6 Epic, 3 Rare
      (12, 1, 1), (12, 2, 2), (12, 3, 6), (12, 4, 3),
      -- TIER_13: 5 Legendary, 3 Epic, 2 Rare, 4 Common
      (13, 2, 5), (13, 3, 3), (13, 4, 2), (13, 5, 4),
      -- TIER_14: 2 Legendary, 3 Epic, 3 Rare, 4 Common
      (14, 2, 2), (14, 3, 3), (14, 4, 3), (14, 5, 4),
      -- TIER_15: 1 Legendary, 3 Epic, 1 Rare, 2 Common
      (15, 2, 1), (15, 3, 3), (15, 4, 1), (15, 5, 2)
  `);

    // Create the airdrop_users table
    await queryRunner.query(`
      CREATE TABLE "airdrop_users_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "address" character varying NOT NULL, 
          "tierId" integer NOT NULL, 
          "unlockedLevel1" boolean NOT NULL DEFAULT false,
          "unlockedLevel2" boolean NOT NULL DEFAULT false,
          "unlockedLevel3" boolean NOT NULL DEFAULT false,
          "tierUpgraded" boolean NOT NULL DEFAULT false,
          CONSTRAINT "PK_airdrop_users_opensea_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "UQ_airdrop_users_opensea_chapter1_address" UNIQUE ("address"),
          CONSTRAINT "FK_airdrop_users_opensea_chapter1_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_opensea_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);

    // Create index on address for faster lookups
    await queryRunner.query(
      `CREATE INDEX "IDX_airdrop_users_opensea_chapter1_address" ON "airdrop_users_opensea_chapter1" ("address")`,
    );

    // Create the custom enum type for users chests status
    await queryRunner.query(`
      CREATE TYPE "users_chests_status_opensea_chapter1" AS ENUM ('LOCKED', 'UNLOCKED', 'CLAIMABLE')
  `);

    // Create the airdrop_users_chests table
    await queryRunner.query(`
      CREATE TABLE "airdrop_users_chests_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "address" character varying NOT NULL, 
          "chestId" integer NOT NULL,
          "status" "users_chests_status_opensea_chapter1" NOT NULL DEFAULT 'LOCKED', 
          "rank" "rank" NOT NULL DEFAULT 'BRONZE_5',
          CONSTRAINT "PK_airdrop_users_chests_opensea_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "FK_airdrop_users_chests_opensea_chapter1_address" FOREIGN KEY ("address") REFERENCES "airdrop_users_opensea_chapter1"("address") ON DELETE CASCADE ON UPDATE NO ACTION,
          CONSTRAINT "FK_airdrop_users_chests_opensea_chapter1_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_opensea_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);

    // Create indexes for faster lookups
    await queryRunner.query(
      `CREATE INDEX "IDX_airdrop_users_chests_opensea_chapter1_address" ON "airdrop_users_chests_opensea_chapter1" ("address")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_airdrop_users_chests_opensea_chapter1_status" ON "airdrop_users_chests_opensea_chapter1" ("status")`,
    );

    // Create the airdrop_tiers_unlocking table
    await queryRunner.query(`
      CREATE TABLE "airdrop_tiers_unlocking_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "tierId" integer NOT NULL, 
          "rank" "rank" NOT NULL,
          "chestId" integer NOT NULL,
          "chestCount" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_unlocking_opensea_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "FK_airdrop_tiers_unlocking_opensea_chapter1_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_opensea_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
          CONSTRAINT "FK_airdrop_tiers_unlocking_opensea_chapter1_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_opensea_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);

    // Insert the unlocking rules for all tiers and ranks
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_unlocking_opensea_chapter1" ("tierId", "rank", "chestId", "chestCount") VALUES 
      -- TIER_1 BRONZE_3: 3 Mythic, 4 Legendary, 4 Epic
      (1, 'BRONZE_3', 1, 3), (1, 'BRONZE_3', 2, 4), (1, 'BRONZE_3', 3, 4),
      -- TIER_1 SILVER_1: 3 Mythic, 4 Legendary, 4 Epic
      (1, 'SILVER_1', 1, 3), (1, 'SILVER_1', 2, 4), (1, 'SILVER_1', 3, 4),
      -- TIER_1 GOLD_3: 4 Mythic, 2 Legendary, 2 Epic
      (1, 'GOLD_3', 1, 4), (1, 'GOLD_3', 2, 2), (1, 'GOLD_3', 3, 2),
      
      -- TIER_2 BRONZE_3: 2 Mythic, 2 Legendary, 3 Epic
      (2, 'BRONZE_3', 1, 2), (2, 'BRONZE_3', 2, 2), (2, 'BRONZE_3', 3, 3),
      -- TIER_2 SILVER_1: 3 Mythic, 3 Legendary, 1 Epic
      (2, 'SILVER_1', 1, 3), (2, 'SILVER_1', 2, 3), (2, 'SILVER_1', 3, 1),
      -- TIER_2 GOLD_3: 3 Mythic, 2 Legendary, 2 Epic
      (2, 'GOLD_3', 1, 3), (2, 'GOLD_3', 2, 2), (2, 'GOLD_3', 3, 2),
      
      -- TIER_3 BRONZE_3: 2 Mythic, 3 Legendary, 3 Epic
      (3, 'BRONZE_3', 1, 2), (3, 'BRONZE_3', 2, 3), (3, 'BRONZE_3', 3, 3),
      -- TIER_3 SILVER_1: 3 Mythic, 2 Legendary, 2 Epic
      (3, 'SILVER_1', 1, 3), (3, 'SILVER_1', 2, 2), (3, 'SILVER_1', 3, 2),
      -- TIER_3 GOLD_3: 2 Mythic, 2 Legendary, 2 Epic
      (3, 'GOLD_3', 1, 2), (3, 'GOLD_3', 2, 2), (3, 'GOLD_3', 3, 2),
      
      -- TIER_4 BRONZE_3: 2 Mythic, 2 Legendary, 2 Epic
      (4, 'BRONZE_3', 1, 2), (4, 'BRONZE_3', 2, 2), (4, 'BRONZE_3', 3, 2),
      -- TIER_4 SILVER_1: 2 Mythic, 3 Legendary, 3 Epic
      (4, 'SILVER_1', 1, 2), (4, 'SILVER_1', 2, 3), (4, 'SILVER_1', 3, 3),
      -- TIER_4 GOLD_3: 2 Mythic, 1 Legendary, 1 Epic
      (4, 'GOLD_3', 1, 2), (4, 'GOLD_3', 2, 1), (4, 'GOLD_3', 3, 1),
      
      -- TIER_5 BRONZE_3: 2 Mythic, 1 Legendary, 3 Epic
      (5, 'BRONZE_3', 1, 2), (5, 'BRONZE_3', 2, 1), (5, 'BRONZE_3', 3, 3),
      -- TIER_5 SILVER_1: 2 Mythic, 1 Legendary, 2 Epic
      (5, 'SILVER_1', 1, 2), (5, 'SILVER_1', 2, 1), (5, 'SILVER_1', 3, 2),
      -- TIER_5 GOLD_3: 1 Mythic, 4 Legendary, 2 Epic
      (5, 'GOLD_3', 1, 1), (5, 'GOLD_3', 2, 4), (5, 'GOLD_3', 3, 2),
      
      -- TIER_6 BRONZE_3: 2 Mythic, 1 Legendary
      (6, 'BRONZE_3', 1, 2), (6, 'BRONZE_3', 2, 1),
      -- TIER_6 SILVER_1: 2 Mythic, 1 Epic
      (6, 'SILVER_1', 1, 2), (6, 'SILVER_1', 3, 1),
      -- TIER_6 GOLD_3: 1 Mythic, 2 Legendary, 3 Epic
      (6, 'GOLD_3', 1, 1), (6, 'GOLD_3', 2, 2), (6, 'GOLD_3', 3, 3),
      
      -- TIER_7 BRONZE_3: 1 Mythic, 2 Legendary, 1 Epic
      (7, 'BRONZE_3', 1, 1), (7, 'BRONZE_3', 2, 2), (7, 'BRONZE_3', 3, 1),
      -- TIER_7 SILVER_1: 2 Mythic, 1 Legendary, 1 Epic
      (7, 'SILVER_1', 1, 2), (7, 'SILVER_1', 2, 1), (7, 'SILVER_1', 3, 1),
      -- TIER_7 GOLD_3: 1 Mythic, 2 Legendary, 1 Epic
      (7, 'GOLD_3', 1, 1), (7, 'GOLD_3', 2, 2), (7, 'GOLD_3', 3, 1),
      
      -- TIER_8 BRONZE_3: 1 Mythic, 3 Legendary
      (8, 'BRONZE_3', 1, 1), (8, 'BRONZE_3', 2, 3),
      -- TIER_8 SILVER_1: 1 Mythic, 2 Legendary, 1 Epic
      (8, 'SILVER_1', 1, 1), (8, 'SILVER_1', 2, 2), (8, 'SILVER_1', 3, 1),
      -- TIER_8 GOLD_3: 1 Mythic, 1 Legendary, 3 Epic
      (8, 'GOLD_3', 1, 1), (8, 'GOLD_3', 2, 1), (8, 'GOLD_3', 3, 3),
      
      -- TIER_9 BRONZE_3: 2 Legendary, 2 Epic, 1 Rare
      (9, 'BRONZE_3', 2, 2), (9, 'BRONZE_3', 3, 2), (9, 'BRONZE_3', 4, 1),
      -- TIER_9 SILVER_1: 1 Mythic, 1 Legendary, 1 Epic
      (9, 'SILVER_1', 1, 1), (9, 'SILVER_1', 2, 1), (9, 'SILVER_1', 3, 1),
      -- TIER_9 GOLD_3: 1 Mythic, 1 Legendary, 3 Rare
      (9, 'GOLD_3', 1, 1), (9, 'GOLD_3', 2, 1), (9, 'GOLD_3', 4, 3),
      
      -- TIER_10 BRONZE_3: 1 Legendary, 3 Epic, 2 Rare
      (10, 'BRONZE_3', 2, 1), (10, 'BRONZE_3', 3, 3), (10, 'BRONZE_3', 4, 2),
      -- TIER_10 SILVER_1: 1 Mythic, 3 Epic
      (10, 'SILVER_1', 1, 1), (10, 'SILVER_1', 3, 3),
      -- TIER_10 GOLD_3: 1 Mythic, 1 Epic
      (10, 'GOLD_3', 1, 1), (10, 'GOLD_3', 3, 1),
      
      -- TIER_11 BRONZE_3: 1 Legendary, 3 Epic, 3 Rare
      (11, 'BRONZE_3', 2, 1), (11, 'BRONZE_3', 3, 3), (11, 'BRONZE_3', 4, 3),
      -- TIER_11 SILVER_1: 1 Mythic, 1 Epic, 1 Rare
      (11, 'SILVER_1', 1, 1), (11, 'SILVER_1', 3, 1), (11, 'SILVER_1', 4, 1),
      -- TIER_11 GOLD_3: 3 Legendary, 1 Epic, 1 Rare
      (11, 'GOLD_3', 2, 3), (11, 'GOLD_3', 3, 1), (11, 'GOLD_3', 4, 1),
      
      -- TIER_12 BRONZE_3: 1 Legendary, 2 Epic, 1 Rare
      (12, 'BRONZE_3', 2, 1), (12, 'BRONZE_3', 3, 2), (12, 'BRONZE_3', 4, 1),
      -- TIER_12 SILVER_1: 1 Mythic, 1 Epic
      (12, 'SILVER_1', 1, 1), (12, 'SILVER_1', 3, 1),
      -- TIER_12 GOLD_3: 1 Legendary, 3 Epic, 2 Rare
      (12, 'GOLD_3', 2, 1), (12, 'GOLD_3', 3, 3), (12, 'GOLD_3', 4, 2),
      
      -- TIER_13 BRONZE_3: 1 Legendary, 1 Epic, 2 Common
      (13, 'BRONZE_3', 2, 1), (13, 'BRONZE_3', 3, 1), (13, 'BRONZE_3', 5, 2),
      -- TIER_13 SILVER_1: 2 Legendary, 1 Epic, 2 Common
      (13, 'SILVER_1', 2, 2), (13, 'SILVER_1', 3, 1), (13, 'SILVER_1', 5, 2),
      -- TIER_13 GOLD_3: 2 Legendary, 1 Epic, 2 Rare
      (13, 'GOLD_3', 2, 2), (13, 'GOLD_3', 3, 1), (13, 'GOLD_3', 4, 2),
      
      -- TIER_14 BRONZE_3: 2 Epic, 1 Rare, 3 Common
      (14, 'BRONZE_3', 3, 2), (14, 'BRONZE_3', 4, 1), (14, 'BRONZE_3', 5, 3),
      -- TIER_14 SILVER_1: 1 Legendary, 1 Rare, 1 Common
      (14, 'SILVER_1', 2, 1), (14, 'SILVER_1', 4, 1), (14, 'SILVER_1', 5, 1),
      -- TIER_14 GOLD_3: 1 Legendary, 1 Epic, 1 Rare
      (14, 'GOLD_3', 2, 1), (14, 'GOLD_3', 3, 1), (14, 'GOLD_3', 4, 1),
      
      -- TIER_15 BRONZE_3: 1 Epic, 1 Rare, 1 Common
      (15, 'BRONZE_3', 3, 1), (15, 'BRONZE_3', 4, 1), (15, 'BRONZE_3', 5, 1),
      -- TIER_15 SILVER_1: 2 Epic, 1 Common
      (15, 'SILVER_1', 3, 2), (15, 'SILVER_1', 5, 1),
      -- TIER_15 GOLD_3: 1 Legendary
      (15, 'GOLD_3', 2, 1)
  `);

    await queryRunner.query(`
    CREATE VIEW "user_airdrop_chest_view_opensea_chapter1" AS
    SELECT 
      u.address,
      jsonb_build_object(
        'id', t.id,
        'name', t.name,
        'totalXp', t."totalXp",
        'totalChestsCount', t."totalChestsCount"
      ) as tier,
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', c.id,
            'name', c.name,
            'valueXp', c."valueXp",
            'status', uc.status,
            'tier', jsonb_build_object(
              'id', t.id,
              'name', t.name,
              'totalXp', t."totalXp",
              'totalChestsCount', t."totalChestsCount"
            )
          )
        )
        FROM "airdrop_users_chests_opensea_chapter1" uc
        INNER JOIN "airdrop_chests_opensea_chapter1" c ON c.id = uc."chestId"
        WHERE uc.address = u.address
      ) as chests
    FROM "airdrop_users_opensea_chapter1" u
    INNER JOIN "airdrop_tiers_opensea_chapter1" t ON t.id = u."tierId"
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /**
     * OPENSEA AIRDROP DATA
     */
    await queryRunner.query(
      'DROP VIEW IF EXISTS "user_airdrop_chest_view_opensea_chapter1"',
    );

    await queryRunner.query(
      `DROP TABLE "airdrop_tiers_unlocking_opensea_chapter1"`,
    );
    await queryRunner.query(
      `DROP TABLE "airdrop_users_chests_opensea_chapter1"`,
    );
    await queryRunner.query(`DROP TYPE "users_chests_status_opensea_chapter1"`);
    await queryRunner.query(`DROP TABLE "airdrop_users_opensea_chapter1"`);
    await queryRunner.query(
      `DROP TABLE "airdrop_tiers_delivery_rules_opensea_chapter1"`,
    );
    await queryRunner.query(`DROP TABLE "airdrop_tiers_opensea_chapter1"`);
    await queryRunner.query(`DROP TYPE "airdrop_tiers_name_opensea_chapter1"`);
    await queryRunner.query(`DROP TABLE "airdrop_chests_opensea_chapter1"`);
    await queryRunner.query(`DROP TYPE "airdrop_chests_type_opensea_chapter1"`);

    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "checkedAirdropOpenseaChapter1"`,
    );
  }
}
