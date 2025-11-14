import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1763133781574 implements MigrationInterface {
  name = 'Migrations1763133781574';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      CREATE TYPE "airdrop_tiers_name_opensea_chapter1" AS ENUM ('D5', 'P1', 'P2', 'P3', 'P4', 'P5', 'G1', 'G2', 'G3', 'G4', 'G5', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'B4')
  `);

    // Create the airdrop_tiers table
    await queryRunner.query(`
      CREATE TABLE "airdrop_tiers_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_tiers_name_opensea_chapter1" NOT NULL, 
          "totalChestsCount" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_opensea_chapter1_id" PRIMARY KEY ("id")
      )
  `);

    // Insert the 20 predefined records for airdrop_tiers
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_opensea_chapter1" ("id", "name", "totalChestsCount") VALUES 
      (1, 'D5', 433),
      (2, 'P1', 396),
      (3, 'P2', 363),
      (4, 'P3', 284),
      (5, 'P4', 155),
      (6, 'P5', 136),
      (7, 'G1', 107),
      (8, 'G2', 99),
      (9, 'G3', 86),
      (10, 'G4', 75),
      (11, 'G5', 71),
      (12, 'S1', 53),
      (13, 'S2', 39),
      (14, 'S3', 35),
      (15, 'S4', 35),
      (16, 'S5', 38),
      (17, 'B1', 27),
      (18, 'B2', 26),
      (19, 'B3', 15),
      (20, 'B4', 5)
  `);

    // Set the sequence to start from 21 for future inserts
    await queryRunner.query(
      `SELECT setval('airdrop_tiers_opensea_chapter1_id_seq', 20, true)`,
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
    // chestId mapping: 1=Mythic, 2=Legendary, 3=Epic, 4=Rare, 5=Common
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_delivery_rules_opensea_chapter1" ("tierId", "chestId", "count") VALUES 
      -- D5: 156 Mythic, 96 Legendary, 92 Epic, 89 Rare
      (1, 1, 156), (1, 2, 96), (1, 3, 92), (1, 4, 89),
      -- P1: 99 Mythic, 99 Legendary, 99 Epic, 99 Rare
      (2, 1, 99), (2, 2, 99), (2, 3, 99), (2, 4, 99),
      -- P2: 77 Mythic, 99 Legendary, 88 Epic, 99 Rare
      (3, 1, 77), (3, 2, 99), (3, 3, 88), (3, 4, 99),
      -- P3: 64 Mythic, 58 Legendary, 88 Epic, 74 Rare
      (4, 1, 64), (4, 2, 58), (4, 3, 88), (4, 4, 74),
      -- P4: 45 Mythic, 62 Legendary, 25 Epic, 23 Rare
      (5, 1, 45), (5, 2, 62), (5, 3, 25), (5, 4, 23),
      -- P5: 34 Mythic, 49 Legendary, 29 Epic, 24 Rare
      (6, 1, 34), (6, 2, 49), (6, 3, 29), (6, 4, 24),
      -- G1: 29 Mythic, 15 Legendary, 31 Epic, 32 Rare
      (7, 1, 29), (7, 2, 15), (7, 3, 31), (7, 4, 32),
      -- G2: 22 Mythic, 15 Legendary, 31 Epic, 31 Rare
      (8, 1, 22), (8, 2, 15), (8, 3, 31), (8, 4, 31),
      -- G3: 15 Mythic, 18 Legendary, 34 Epic, 19 Rare
      (9, 1, 15), (9, 2, 18), (9, 3, 34), (9, 4, 19),
      -- G4: 9 Mythic, 21 Legendary, 34 Epic, 11 Rare
      (10, 1, 9), (10, 2, 21), (10, 3, 34), (10, 4, 11),
      -- G5: 7 Mythic, 14 Legendary, 32 Epic, 18 Rare
      (11, 1, 7), (11, 2, 14), (11, 3, 32), (11, 4, 18),
      -- S1: 6 Mythic, 9 Legendary, 19 Epic, 19 Rare
      (12, 1, 6), (12, 2, 9), (12, 3, 19), (12, 4, 19),
      -- S2: 5 Mythic, 6 Legendary, 3 Epic, 25 Rare
      (13, 1, 5), (13, 2, 6), (13, 3, 3), (13, 4, 25),
      -- S3: 3 Mythic, 6 Legendary, 5 Epic, 21 Rare
      (14, 1, 3), (14, 2, 6), (14, 3, 5), (14, 4, 21),
      -- S4: 2 Mythic, 3 Legendary, 9 Epic, 21 Rare
      (15, 1, 2), (15, 2, 3), (15, 3, 9), (15, 4, 21),
      -- S5: 6 Legendary, 10 Epic, 17 Rare, 5 Common
      (16, 2, 6), (16, 3, 10), (16, 4, 17), (16, 5, 5),
      -- B1: 5 Legendary, 7 Epic, 8 Rare, 7 Common
      (17, 2, 5), (17, 3, 7), (17, 4, 8), (17, 5, 7),
      -- B2: 3 Legendary, 4 Epic, 5 Rare, 14 Common
      (18, 2, 3), (18, 3, 4), (18, 4, 5), (18, 5, 14),
      -- B3: 2 Legendary, 2 Epic, 3 Rare, 8 Common
      (19, 2, 2), (19, 3, 2), (19, 4, 3), (19, 5, 8),
      -- B4: 1 Legendary, 1 Epic, 2 Rare, 1 Common
      (20, 2, 1), (20, 3, 1), (20, 4, 2), (20, 5, 1)
  `);

    // Create the airdrop_users table
    await queryRunner.query(`
      CREATE TABLE "airdrop_users_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "address" character varying NOT NULL, 
          "tierId" integer NOT NULL, 
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
      CREATE TYPE "users_chests_status_opensea_chapter1" AS ENUM ('UNLOCKED', 'CLAIMABLE')
  `);

    // Create the airdrop_users_chests table
    await queryRunner.query(`
      CREATE TABLE "airdrop_users_chests_opensea_chapter1" (
          "id" SERIAL NOT NULL, 
          "address" character varying NOT NULL, 
          "chestId" integer NOT NULL,
          "status" "users_chests_status_opensea_chapter1" NOT NULL DEFAULT 'UNLOCKED', 
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /**
     * OPENSEA AIRDROP DATA
     */
    await queryRunner.query(`DROP TABLE "airdrop_users_chests_opensea_chapter1"`);
    await queryRunner.query(`DROP TYPE "users_chests_status_opensea_chapter1"`);
    await queryRunner.query(`DROP TABLE "airdrop_users_opensea_chapter1"`);
    await queryRunner.query(
      `DROP TABLE "airdrop_tiers_delivery_rules_opensea_chapter1"`,
    );
    await queryRunner.query(`DROP TABLE "airdrop_tiers_opensea_chapter1"`);
    await queryRunner.query(`DROP TYPE "airdrop_tiers_name_opensea_chapter1"`);
    await queryRunner.query(`DROP TABLE "airdrop_chests_opensea_chapter1"`);
    await queryRunner.query(`DROP TYPE "airdrop_chests_type_opensea_chapter1"`);
  }
}

