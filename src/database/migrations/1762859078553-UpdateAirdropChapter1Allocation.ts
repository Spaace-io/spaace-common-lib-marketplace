import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1762859078553 implements MigrationInterface {
  name = 'Migrations1762859078553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Delete all delivery rules
    await queryRunner.query(`
      DELETE FROM "airdrop_tiers_delivery_rules_chapter1"
    `);

    // Delete all tiers
    await queryRunner.query(`
      DELETE FROM "airdrop_tiers_chapter1"
    `);

    // Delete all chests
    await queryRunner.query(`
      DELETE FROM "airdrop_chests_chapter1"
    `);

    // Change columns to text temporarily
    await queryRunner.query(`
      ALTER TABLE "airdrop_chests_chapter1" 
      ALTER COLUMN "name" TYPE text
    `);

    await queryRunner.query(`
      ALTER TABLE "airdrop_tiers_chapter1" 
      ALTER COLUMN "name" TYPE text
    `);

    // Drop old enums
    await queryRunner.query(`
      DROP TYPE IF EXISTS "airdrop_chests_type_chapter1"
    `);

    await queryRunner.query(`
      DROP TYPE IF EXISTS "airdrop_tiers_name_chapter1"
    `);

    // Create new enums with correct values
    await queryRunner.query(`
      CREATE TYPE "airdrop_chests_type_chapter1" AS ENUM ('Mythic', 'Legendary', 'Epic', 'Rare', 'Common')
    `);

    await queryRunner.query(`
      CREATE TYPE "airdrop_tiers_name_chapter1" AS ENUM ('D5', 'P1', 'P2', 'P3', 'P4', 'P5', 'G1', 'G2', 'G3', 'G4', 'G5', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'B4')
    `);

    // Change columns back to enum
    await queryRunner.query(`
      ALTER TABLE "airdrop_chests_chapter1" 
      ALTER COLUMN "name" TYPE "airdrop_chests_type_chapter1" 
      USING "name"::"airdrop_chests_type_chapter1"
    `);

    await queryRunner.query(`
      ALTER TABLE "airdrop_tiers_chapter1" 
      ALTER COLUMN "name" TYPE "airdrop_tiers_name_chapter1" 
      USING "name"::"airdrop_tiers_name_chapter1"
    `);

    // Reset sequences
    await queryRunner.query(
      `SELECT setval('airdrop_chests_chapter1_id_seq', 1, false)`,
    );
    await queryRunner.query(
      `SELECT setval('airdrop_tiers_chapter1_id_seq', 1, false)`,
    );

    // Insert all chests with new values
    await queryRunner.query(`
      INSERT INTO "airdrop_chests_chapter1" ("id", "name", "valueXp") VALUES 
      (1, 'Mythic', 6000),
      (2, 'Legendary', 1500),
      (3, 'Epic', 500),
      (4, 'Rare', 100),
      (5, 'Common', 50)
    `);

    await queryRunner.query(
      `SELECT setval('airdrop_chests_chapter1_id_seq', 5, true)`,
    );

    // Insert all tiers with new totalChestsCount values
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_chapter1" ("id", "name", "totalXp", "totalChestsCount") VALUES 
      (1, 'D5', 0, 433),
      (2, 'P1', 0, 396),
      (3, 'P2', 0, 363),
      (4, 'P3', 0, 284),
      (5, 'P4', 0, 155),
      (6, 'P5', 0, 136),
      (7, 'G1', 0, 107),
      (8, 'G2', 0, 99),
      (9, 'G3', 0, 86),
      (10, 'G4', 0, 75),
      (11, 'G5', 0, 71),
      (12, 'S1', 0, 53),
      (13, 'S2', 0, 39),
      (14, 'S3', 0, 35),
      (15, 'S4', 0, 35),
      (16, 'S5', 0, 38),
      (17, 'B1', 0, 27),
      (18, 'B2', 0, 26),
      (19, 'B3', 0, 15),
      (20, 'B4', 0, 5)
    `);

    await queryRunner.query(
      `SELECT setval('airdrop_tiers_chapter1_id_seq', 20, true)`,
    );

    // Insert all delivery rules with new values
    // chestId mapping: 1=Mythic, 2=Legendary, 3=Epic, 4=Rare, 5=Common
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_delivery_rules_chapter1" ("tierId", "chestId", "count") VALUES 
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete all delivery rules
    await queryRunner.query(`
      DELETE FROM "airdrop_tiers_delivery_rules_chapter1"
    `);

    // Delete all tiers
    await queryRunner.query(`
      DELETE FROM "airdrop_tiers_chapter1"
    `);

    // Delete all chests
    await queryRunner.query(`
      DELETE FROM "airdrop_chests_chapter1"
    `);

    // Change columns to text temporarily
    await queryRunner.query(`
      ALTER TABLE "airdrop_chests_chapter1" 
      ALTER COLUMN "name" TYPE text
    `);

    await queryRunner.query(`
      ALTER TABLE "airdrop_tiers_chapter1" 
      ALTER COLUMN "name" TYPE text
    `);

    // Drop new enums
    await queryRunner.query(`
      DROP TYPE IF EXISTS "airdrop_chests_type_chapter1"
    `);

    await queryRunner.query(`
      DROP TYPE IF EXISTS "airdrop_tiers_name_chapter1"
    `);

    // Restore old enums
    await queryRunner.query(`
      CREATE TYPE "airdrop_chests_type_chapter1" AS ENUM ('Qantum', 'Mythic', 'Legendary', 'Epic', 'Rare')
    `);

    await queryRunner.query(`
      CREATE TYPE "airdrop_tiers_name_chapter1" AS ENUM ('P1', 'P2', 'P3', 'P4', 'P5', 'G1', 'G2', 'G3', 'G4', 'G5', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'B4')
    `);

    // Change columns back to enum
    await queryRunner.query(`
      ALTER TABLE "airdrop_chests_chapter1" 
      ALTER COLUMN "name" TYPE "airdrop_chests_type_chapter1" 
      USING "name"::"airdrop_chests_type_chapter1"
    `);

    await queryRunner.query(`
      ALTER TABLE "airdrop_tiers_chapter1" 
      ALTER COLUMN "name" TYPE "airdrop_tiers_name_chapter1" 
      USING "name"::"airdrop_tiers_name_chapter1"
    `);

    // Reset sequences
    await queryRunner.query(
      `SELECT setval('airdrop_chests_chapter1_id_seq', 1, false)`,
    );
    await queryRunner.query(
      `SELECT setval('airdrop_tiers_chapter1_id_seq', 1, false)`,
    );

    // Restore original chests
    await queryRunner.query(`
      INSERT INTO "airdrop_chests_chapter1" ("id", "name", "valueXp") VALUES 
      (1, 'Qantum', 20000),
      (2, 'Mythic', 6000),
      (3, 'Legendary', 1500),
      (4, 'Epic', 500),
      (5, 'Rare', 100)
    `);

    await queryRunner.query(
      `SELECT setval('airdrop_chests_chapter1_id_seq', 5, true)`,
    );

    // Restore original tiers
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_chapter1" ("id", "name", "totalXp", "totalChestsCount") VALUES 
      (1, 'P1', 0, 198),
      (2, 'P2', 0, 113),
      (3, 'P3', 0, 80),
      (4, 'P4', 0, 72),
      (5, 'P5', 0, 70),
      (6, 'G1', 0, 65),
      (7, 'G2', 0, 59),
      (8, 'G3', 0, 52),
      (9, 'G4', 0, 50),
      (10, 'G5', 0, 43),
      (11, 'S1', 0, 42),
      (12, 'S2', 0, 37),
      (13, 'S3', 0, 36),
      (14, 'S4', 0, 32),
      (15, 'S5', 0, 30),
      (16, 'B1', 0, 30),
      (17, 'B2', 0, 26),
      (18, 'B3', 0, 18),
      (19, 'B4', 0, 9)
    `);

    await queryRunner.query(
      `SELECT setval('airdrop_tiers_chapter1_id_seq', 19, true)`,
    );

    // Restore original delivery rules
    // chestId mapping: 1=Qantum, 2=Mythic, 3=Legendary, 4=Epic, 5=Rare
    await queryRunner.query(`
      INSERT INTO "airdrop_tiers_delivery_rules_chapter1" ("tierId", "chestId", "count") VALUES 
      -- P1: 33 Quantum, 44 Mythic, 55 Legendary, 66 Epic
      (1, 1, 33), (1, 2, 44), (1, 3, 55), (1, 4, 66),
      -- P2: 27 Quantum, 27 Mythic, 28 Legendary, 31 Epic
      (2, 1, 27), (2, 2, 27), (2, 3, 28), (2, 4, 31),
      -- P3: 20 Quantum, 19 Mythic, 20 Legendary, 21 Epic
      (3, 1, 20), (3, 2, 19), (3, 3, 20), (3, 4, 21),
      -- P4: 14 Quantum, 15 Mythic, 18 Legendary, 25 Epic
      (4, 1, 14), (4, 2, 15), (4, 3, 18), (4, 4, 25),
      -- P5: 8 Quantum, 18 Mythic, 15 Legendary, 29 Epic
      (5, 1, 8), (5, 2, 18), (5, 3, 15), (5, 4, 29),
      -- G1: 5 Quantum, 15 Mythic, 16 Legendary, 29 Epic
      (6, 1, 5), (6, 2, 15), (6, 3, 16), (6, 4, 29),
      -- G2: 4 Quantum, 9 Mythic, 15 Legendary, 31 Epic
      (7, 1, 4), (7, 2, 9), (7, 3, 15), (7, 4, 31),
      -- G3: 3 Quantum, 8 Mythic, 7 Legendary, 34 Epic
      (8, 1, 3), (8, 2, 8), (8, 3, 7), (8, 4, 34),
      -- G4: 3 Quantum, 2 Mythic, 11 Legendary, 34 Epic
      (9, 1, 3), (9, 2, 2), (9, 3, 11), (9, 4, 34),
      -- G5: 2 Quantum, 2 Mythic, 7 Legendary, 32 Epic
      (10, 1, 2), (10, 2, 2), (10, 3, 7), (10, 4, 32),
      -- S1: 6 Mythic, 10 Legendary, 26 Epic
      (11, 2, 6), (11, 3, 10), (11, 4, 26),
      -- S2: 5 Mythic, 7 Legendary, 25 Rare
      (12, 2, 5), (12, 3, 7), (12, 5, 25),
      -- S3: 4 Mythic, 6 Legendary, 26 Rare
      (13, 2, 4), (13, 3, 6), (13, 5, 26),
      -- S4: 2 Mythic, 4 Legendary, 8 Epic, 18 Rare
      (14, 2, 2), (14, 3, 4), (14, 4, 8), (14, 5, 18),
      -- S5: 1 Mythic, 5 Legendary, 9 Epic, 15 Rare
      (15, 2, 1), (15, 3, 5), (15, 4, 9), (15, 5, 15),
      -- B1: 6 Legendary, 8 Epic, 16 Rare
      (16, 3, 6), (16, 4, 8), (16, 5, 16),
      -- B2: 3 Legendary, 7 Epic, 16 Rare
      (17, 3, 3), (17, 4, 7), (17, 5, 16),
      -- B3: 2 Legendary, 3 Epic, 13 Rare
      (18, 3, 2), (18, 4, 3), (18, 5, 13),
      -- B4: 1 Legendary, 1 Epic, 7 Rare
      (19, 3, 1), (19, 4, 1), (19, 5, 7)
    `);
  }
}
