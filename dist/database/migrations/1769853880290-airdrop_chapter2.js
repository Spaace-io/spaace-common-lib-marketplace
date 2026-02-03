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
exports.Migrations1769853880290 = void 0;
class Migrations1769853880290 {
    constructor() {
        this.name = 'Migrations1769853880290';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "checkedAirdropChapter2" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`
      CREATE TYPE "airdrop_chests_type_chapter2" AS ENUM ('Quantum', 'Mythic', 'Legendary', 'Epic', 'Rare')
    `);
            yield queryRunner.query(`
      CREATE TABLE "airdrop_chests_chapter2" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_chests_type_chapter2" NOT NULL, 
          "valueXp" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_chests_chapter2_id" PRIMARY KEY ("id")
      )
  `);
            // Insert the 5 predefined records for airdrop_chests
            yield queryRunner.query(`
      INSERT INTO "airdrop_chests_chapter2" ("id", "name", "valueXp") VALUES 
        (1, 'Quantum', 20000),
        (2, 'Mythic', 6000),
        (3, 'Legendary', 1500),
        (4, 'Epic', 500),
        (5, 'Rare', 100)
    `);
            // Set the sequence to start from 6 for future inserts
            yield queryRunner.query(`SELECT setval('airdrop_chests_chapter2_id_seq', 5, true)`);
            // Create the custom enum type for airdrop tiers
            yield queryRunner.query(`
        CREATE TYPE "airdrop_tiers_name_chapter2" AS ENUM ('D2', 'D3', 'D4', 'D5', 'P1', 'P2', 'P3', 'P4', 'P5', 'G1', 'G2', 'G3', 'G4', 'G5', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'B4')
    `);
            // Create the airdrop_tiers table
            yield queryRunner.query(`
      CREATE TABLE "airdrop_tiers_chapter2" (
          "id" SERIAL NOT NULL, 
          "name" "airdrop_tiers_name_chapter2" NOT NULL, 
          "totalXp" integer NOT NULL,
          "totalChestsCount" integer NOT NULL, 
          CONSTRAINT "PK_airdrop_tiers_chapter2_id" PRIMARY KEY ("id")
      )
  `);
            yield queryRunner.query(`
    INSERT INTO "airdrop_tiers_chapter2" ("id", "name", "totalXp", "totalChestsCount") VALUES 
    (1, 'D2', 0, 999),
    (2, 'D3', 0, 642),
    (3, 'D4', 0, 352),
    (4, 'D5', 0, 242),
    (5, 'P1', 0, 198),
    (6, 'P2', 0, 113),
    (7, 'P3', 0, 80),
    (8, 'P4', 0, 72),
    (9, 'P5', 0, 70),
    (10, 'G1', 0, 65),
    (11, 'G2', 0, 59),
    (12, 'G3', 0, 52),
    (13, 'G4', 0, 50),
    (14, 'G5', 0, 43),
    (15, 'S1', 0, 42),
    (16, 'S2', 0, 37),
    (17, 'S3', 0, 36),
    (18, 'S4', 0, 32),
    (19, 'S5', 0, 30),
    (20, 'B1', 0, 30),
    (21, 'B2', 0, 26),
    (22, 'B3', 0, 18),
    (23, 'B4', 0, 13)
`);
            yield queryRunner.query(`SELECT setval('airdrop_tiers_chapter2_id_seq', 23, true)`);
            // Create the airdrop_tiers_delivery_rules table
            yield queryRunner.query(`
  CREATE TABLE "airdrop_tiers_delivery_rules_chapter2" (
      "id" SERIAL NOT NULL, 
      "tierId" integer NOT NULL, 
      "chestId" integer NOT NULL,
      "count" integer NOT NULL, 
      CONSTRAINT "PK_airdrop_tiers_delivery_rules_chapter2_id" PRIMARY KEY ("id"),
      CONSTRAINT "FK_airdrop_tiers_delivery_rules_chapter2_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_chapter2"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
      CONSTRAINT "FK_airdrop_tiers_delivery_rules_chapter2_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_chapter2"("id") ON DELETE CASCADE ON UPDATE NO ACTION
  )
`);
            // Insert the delivery rules for each tier
            yield queryRunner.query(`
  INSERT INTO "airdrop_tiers_delivery_rules_chapter2" ("tierId", "chestId", "count") VALUES 
  -- D2 (tierId=1): 444 Quantum, 299 Mythic, 157 Legendary, 99 Epic (Total: 999)
  (1, 1, 444), (1, 2, 299), (1, 3, 157), (1, 4, 99),
  -- D3 (tierId=2): 133 Quantum, 144 Mythic, 166 Legendary, 199 Epic (Total: 642)
  (2, 1, 133), (2, 2, 144), (2, 3, 166), (2, 4, 199),
  -- D4 (tierId=3): 88 Quantum, 88 Mythic, 88 Legendary, 88 Epic (Total: 352)
  (3, 1, 88), (3, 2, 88), (3, 3, 88), (3, 4, 88),
  -- D5 (tierId=4): 44 Quantum, 55 Mythic, 66 Legendary, 77 Epic (Total: 242)
  (4, 1, 44), (4, 2, 55), (4, 3, 66), (4, 4, 77),
  -- P1 (tierId=5): 33 Quantum, 44 Mythic, 55 Legendary, 66 Epic (Total: 198)
  (5, 1, 33), (5, 2, 44), (5, 3, 55), (5, 4, 66),
  -- P2 (tierId=6): 27 Quantum, 27 Mythic, 28 Legendary, 31 Epic (Total: 113)
  (6, 1, 27), (6, 2, 27), (6, 3, 28), (6, 4, 31),
  -- P3 (tierId=7): 20 Quantum, 19 Mythic, 20 Legendary, 21 Epic (Total: 80)
  (7, 1, 20), (7, 2, 19), (7, 3, 20), (7, 4, 21),
  -- P4 (tierId=8): 14 Quantum, 15 Mythic, 18 Legendary, 25 Epic (Total: 72)
  (8, 1, 14), (8, 2, 15), (8, 3, 18), (8, 4, 25),
  -- P5 (tierId=9): 8 Quantum, 18 Mythic, 15 Legendary, 29 Epic (Total: 70)
  (9, 1, 8), (9, 2, 18), (9, 3, 15), (9, 4, 29),
  -- G1 (tierId=10): 5 Quantum, 15 Mythic, 16 Legendary, 29 Epic (Total: 65)
  (10, 1, 5), (10, 2, 15), (10, 3, 16), (10, 4, 29),
  -- G2 (tierId=11): 4 Quantum, 9 Mythic, 15 Legendary, 31 Epic (Total: 59)
  (11, 1, 4), (11, 2, 9), (11, 3, 15), (11, 4, 31),
  -- G3 (tierId=12): 3 Quantum, 8 Mythic, 7 Legendary, 34 Epic (Total: 52)
  (12, 1, 3), (12, 2, 8), (12, 3, 7), (12, 4, 34),
  -- G4 (tierId=13): 3 Quantum, 2 Mythic, 11 Legendary, 34 Epic (Total: 50)
  (13, 1, 3), (13, 2, 2), (13, 3, 11), (13, 4, 34),
  -- G5 (tierId=14): 2 Quantum, 2 Mythic, 7 Legendary, 32 Epic (Total: 43)
  (14, 1, 2), (14, 2, 2), (14, 3, 7), (14, 4, 32),
  -- S1 (tierId=15): 6 Mythic, 10 Legendary, 26 Epic (Total: 42)
  (15, 2, 6), (15, 3, 10), (15, 4, 26),
  -- S2 (tierId=16): 5 Mythic, 7 Legendary, 25 Rare (Total: 37)
  (16, 2, 5), (16, 3, 7), (16, 5, 25),
  -- S3 (tierId=17): 4 Mythic, 6 Legendary, 26 Rare (Total: 36)
  (17, 2, 4), (17, 3, 6), (17, 5, 26),
  -- S4 (tierId=18): 2 Mythic, 4 Legendary, 8 Epic, 18 Rare (Total: 32)
  (18, 2, 2), (18, 3, 4), (18, 4, 8), (18, 5, 18),
  -- S5 (tierId=19): 1 Mythic, 5 Legendary, 9 Epic, 15 Rare (Total: 30)
  (19, 2, 1), (19, 3, 5), (19, 4, 9), (19, 5, 15),
  -- B1 (tierId=20): 6 Legendary, 8 Epic, 16 Rare (Total: 30)
  (20, 3, 6), (20, 4, 8), (20, 5, 16),
  -- B2 (tierId=21): 3 Legendary, 7 Epic, 16 Rare (Total: 26)
  (21, 3, 3), (21, 4, 7), (21, 5, 16),
  -- B3 (tierId=22): 2 Legendary, 3 Epic, 13 Rare (Total: 18)
  (22, 3, 2), (22, 4, 3), (22, 5, 13),
  -- B4 (tierId=23): 1 Legendary, 1 Epic, 11 Rare (Total: 13)
  (23, 3, 1), (23, 4, 1), (23, 5, 11)
`);
            // Create the airdrop_users table
            yield queryRunner.query(`
    CREATE TABLE "airdrop_users_chapter2" (
        "id" SERIAL NOT NULL, 
        "address" character varying NOT NULL, 
        "tierId" integer NOT NULL, 
        "rank" "rank" NOT NULL DEFAULT 'BRONZE_4',
        "points" integer NOT NULL DEFAULT 0,
        CONSTRAINT "PK_airdrop_users_chapter2_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_airdrop_users_chapter2_address" UNIQUE ("address"),
        CONSTRAINT "FK_airdrop_users_chapter2_tierId" FOREIGN KEY ("tierId") REFERENCES "airdrop_tiers_chapter2"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    )
`);
            // Create index on address for faster lookups
            yield queryRunner.query(`CREATE INDEX "IDX_airdrop_users_chapter2_address" ON "airdrop_users_chapter2" ("address")`);
            // Create the custom enum type for users chests status
            yield queryRunner.query(`
    CREATE TYPE "users_chests_status_chapter2" AS ENUM ('UNLOCKED', 'CLAIMABLE')
`);
            // Create the airdrop_users_chests table
            yield queryRunner.query(`
  CREATE TABLE "airdrop_users_chests_chapter2" (
      "id" SERIAL NOT NULL, 
      "address" character varying NOT NULL, 
      "chestId" integer NOT NULL,
      "status" "users_chests_status_chapter2" NOT NULL DEFAULT 'UNLOCKED', 
      CONSTRAINT "PK_airdrop_users_chests_chapter2_id" PRIMARY KEY ("id"),
      CONSTRAINT "FK_airdrop_users_chests_chapter2_address" FOREIGN KEY ("address") REFERENCES "airdrop_users_chapter2"("address") ON DELETE CASCADE ON UPDATE NO ACTION,
      CONSTRAINT "FK_airdrop_users_chests_chapter2_chestId" FOREIGN KEY ("chestId") REFERENCES "airdrop_chests_chapter2"("id") ON DELETE CASCADE ON UPDATE NO ACTION
  )
`);
            // Create indexes for faster lookups
            yield queryRunner.query(`CREATE INDEX "IDX_airdrop_users_chests_chapter2_address" ON "airdrop_users_chests_chapter2" ("address")`);
            yield queryRunner.query(`CREATE INDEX "IDX_airdrop_users_chests_chapter2_status" ON "airdrop_users_chests_chapter2" ("status")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "airdrop_users_chests_chapter2"`);
            yield queryRunner.query(`DROP TYPE "users_chests_status_chapter2"`);
            yield queryRunner.query(`DROP TABLE "airdrop_users_chapter2"`);
            yield queryRunner.query(`DROP TABLE "airdrop_tiers_delivery_rules_chapter2"`);
            yield queryRunner.query(`DROP TABLE "airdrop_tiers_chapter2"`);
            yield queryRunner.query(`DROP TYPE "airdrop_tiers_name_chapter2"`);
            yield queryRunner.query(`DROP TABLE "airdrop_chests_chapter2"`);
            yield queryRunner.query(`DROP TYPE "airdrop_chests_type_chapter2"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "checkedAirdropChapter2"`);
        });
    }
}
exports.Migrations1769853880290 = Migrations1769853880290;
//# sourceMappingURL=1769853880290-airdrop_chapter2.js.map