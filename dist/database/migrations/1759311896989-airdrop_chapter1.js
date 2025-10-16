"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1759311896989 = void 0;
class Migrations1759311896989 {
    constructor() {
        this.name = 'Migrations1759311896989';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "checkedAirdropS1" TO "checkedAirdropChapter0"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "checkedAirdropChapter1" boolean NOT NULL DEFAULT false`);
            /**
             * AIRDROP DATA
             */
            // Create the custom enum type for airdrop chests
            yield queryRunner.query(`
      CREATE TYPE "airdrop_chests_type_chapter1" AS ENUM ('Qantum', 'Mythic', 'Legendary', 'Epic', 'Rare')
  `);
            // Create the airdrop_chests table
            yield queryRunner.query(`
      CREATE TABLE "airdrop_chests_chapter1" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_chests_type_chapter1" NOT NULL, 
          "valueXp" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_chests_chapter1_id" PRIMARY KEY ("id")
      )
  `);
            // Insert the 5 predefined records for airdrop_chests
            yield queryRunner.query(`
      INSERT INTO "airdrop_chests_chapter1" ("id", "name", "valueXp") VALUES 
      (1, 'Qantum', 20000),
      (2, 'Mythic', 6000),
      (3, 'Legendary', 1500),
      (4, 'Epic', 500),
      (5, 'Rare', 100)
  `);
            // Set the sequence to start from 6 for future inserts
            yield queryRunner.query(`SELECT setval('airdrop_chests_chapter1_id_seq', 5, true)`);
            // Create the custom enum type for airdrop tiers
            yield queryRunner.query(`
      CREATE TYPE "airdrop_tiers_name_chapter1" AS ENUM ('P1', 'P2', 'P3', 'P4', 'P5', 'G1', 'G2', 'G3', 'G4', 'G5', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'B4')
  `);
            // Create the airdrop_tiers table
            yield queryRunner.query(`
      CREATE TABLE "airdrop_tiers_chapter1" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_tiers_name_chapter1" NOT NULL, 
          "totalXp" integer NOT NULL,
          "totalChestsCount" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_chapter1_id" PRIMARY KEY ("id")
      )
  `);
            // Insert the 15 predefined records for airdrop_tiers
            yield queryRunner.query(`
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
            // Set the sequence to start from 16 for future inserts
            yield queryRunner.query(`SELECT setval('airdrop_tiers_chapter1_id_seq', 19, true)`);
            // Create the airdrop_tiers_delivery_rules table
            yield queryRunner.query(`
      CREATE TABLE "airdrop_tiers_delivery_rules_chapter1" (
          "id" SERIAL NOT NULL, 
          "tierId" integer NOT NULL, 
          "chestId" integer NOT NULL,
          "count" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_delivery_rules_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "FK_airdrop_tiers_delivery_rules_chapter1_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
          CONSTRAINT "FK_airdrop_tiers_delivery_rules_chapter1_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);
            // Insert the delivery rules for each tier
            yield queryRunner.query(`
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
            // Create the airdrop_users table
            yield queryRunner.query(`
      CREATE TABLE "airdrop_users_chapter1" (
          "id" SERIAL NOT NULL, 
          "address" character varying NOT NULL, 
          "tierId" integer NOT NULL, 
          "rank" "rank" NOT NULL DEFAULT 'BRONZE_4',
          "points" integer NOT NULL DEFAULT 0,
          CONSTRAINT "PK_airdrop_users_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "UQ_airdrop_users_chapter1_address" UNIQUE ("address"),
          CONSTRAINT "FK_airdrop_users_chapter1_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);
            // Create index on address for faster lookups
            yield queryRunner.query(`CREATE INDEX "IDX_airdrop_users_chapter1_address" ON "airdrop_users_chapter1" ("address")`);
            // Create the custom enum type for users chests status
            yield queryRunner.query(`
      CREATE TYPE "users_chests_status_chapter1" AS ENUM ('UNLOCKED', 'CLAIMABLE')
  `);
            // Create the airdrop_users_chests table
            yield queryRunner.query(`
      CREATE TABLE "airdrop_users_chests_chapter1" (
          "id" SERIAL NOT NULL, 
          "address" character varying NOT NULL, 
          "chestId" integer NOT NULL,
          "status" "users_chests_status_chapter1" NOT NULL DEFAULT 'UNLOCKED', 
          CONSTRAINT "PK_airdrop_users_chests_chapter1_id" PRIMARY KEY ("id"),
          CONSTRAINT "FK_airdrop_users_chests_chapter1_address" FOREIGN KEY ("address") REFERENCES "airdrop_users_chapter1"("address") ON DELETE CASCADE ON UPDATE NO ACTION,
          CONSTRAINT "FK_airdrop_users_chests_chapter1_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_chapter1"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
  `);
            // Create indexes for faster lookups
            yield queryRunner.query(`CREATE INDEX "IDX_airdrop_users_chests_chapter1_address" ON "airdrop_users_chests_chapter1" ("address")`);
            yield queryRunner.query(`CREATE INDEX "IDX_airdrop_users_chests_chapter1_status" ON "airdrop_users_chests_chapter1" ("status")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * AIRDROP DATA
             */
            yield queryRunner.query(`DROP TABLE "airdrop_users_chests_chapter1"`);
            yield queryRunner.query(`DROP TYPE "users_chests_status_chapter1"`);
            yield queryRunner.query(`DROP TABLE "airdrop_users_chapter1"`);
            yield queryRunner.query(`DROP TABLE "airdrop_tiers_delivery_rules_chapter1"`);
            yield queryRunner.query(`DROP TABLE "airdrop_tiers_chapter1"`);
            yield queryRunner.query(`DROP TYPE "airdrop_tiers_name_chapter1"`);
            yield queryRunner.query(`DROP TABLE "airdrop_chests_chapter1"`);
            yield queryRunner.query(`DROP TYPE "airdrop_chests_type_chapter1"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "checkedAirdropChapter1"`);
        });
    }
}
exports.Migrations1759311896989 = Migrations1759311896989;
//# sourceMappingURL=1759311896989-airdrop_chapter1.js.map