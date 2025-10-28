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
exports.Migrations1761572943335 = void 0;
class Migrations1761572943335 {
    constructor() {
        this.name = 'Migrations1761572943335';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "creationIP" VARCHAR(45),
      ADD COLUMN "creationFingerprint" VARCHAR(100),
      ADD COLUMN "lastConnectionIP" VARCHAR(45),
      ADD COLUMN "lastConnectionAt" TIMESTAMPTZ
    `);
            yield queryRunner.query(`
      CREATE TABLE "user_connection_logs" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "userAddress" CHAR(40) NOT NULL,
        "ipAddress" VARCHAR(45) NOT NULL,
        "fingerprint" VARCHAR(100),
        "actionType" VARCHAR(50) NOT NULL,
        "actionData" JSONB,
        "timestamp" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "suspicious" BOOLEAN DEFAULT false,
        CONSTRAINT "FK_user_connection_logs_userAddress" 
          FOREIGN KEY ("userAddress") 
          REFERENCES "users"("address") 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION
      )
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_userAddress" 
      ON "user_connection_logs" ("userAddress")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_ipAddress" 
      ON "user_connection_logs" ("ipAddress")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_fingerprint" 
      ON "user_connection_logs" ("fingerprint")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_timestamp" 
      ON "user_connection_logs" ("timestamp" DESC)
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_actionType" 
      ON "user_connection_logs" ("actionType")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_suspicious" 
      ON "user_connection_logs" ("suspicious") 
      WHERE "suspicious" = true
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_composite" 
      ON "user_connection_logs" ("userAddress", "timestamp" DESC)
    `);
            yield queryRunner.query(`
      CREATE TABLE "ip_intelligence" (
        "ipAddress" VARCHAR(45) PRIMARY KEY,
        "totalUsers" INTEGER DEFAULT 0,
        "activeUsers" INTEGER DEFAULT 0,
        "bannedUsers" INTEGER DEFAULT 0,
        "ipType" VARCHAR(20),
        "countryCode" VARCHAR(10),
        "riskScore" INTEGER DEFAULT 0,
        "isBlacklisted" BOOLEAN DEFAULT false
      )
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_riskScore" 
      ON "ip_intelligence" ("riskScore" DESC)
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_totalUsers" 
      ON "ip_intelligence" ("totalUsers" DESC)
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_isBlacklisted" 
      ON "ip_intelligence" ("isBlacklisted") 
      WHERE "isBlacklisted" = true
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_ipType" 
      ON "ip_intelligence" ("ipType")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_countryCode" 
      ON "ip_intelligence" ("countryCode")
    `);
            yield queryRunner.query(`
      CREATE TABLE "device_fingerprints" (
        "fingerprintHash" VARCHAR(100) PRIMARY KEY,
        "totalUsers" INTEGER DEFAULT 0,
        "activeUsers" INTEGER DEFAULT 0,
        "bannedUsers" INTEGER DEFAULT 0,
        "firstSeen" TIMESTAMPTZ DEFAULT NOW(),
        "lastSeen" TIMESTAMPTZ DEFAULT NOW(),
        "riskScore" INTEGER DEFAULT 0,
        "suspicious" BOOLEAN DEFAULT false
      )
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_riskScore" 
      ON "device_fingerprints" ("riskScore" DESC)
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_totalUsers" 
      ON "device_fingerprints" ("totalUsers" DESC)
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_suspicious" 
      ON "device_fingerprints" ("suspicious") 
      WHERE "suspicious" = true
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_lastSeen" 
      ON "device_fingerprints" ("lastSeen" DESC)
    `);
            yield queryRunner.query(`
      ALTER TABLE "ip_intelligence" 
      ADD CONSTRAINT "CHK_ip_intelligence_riskScore_range" 
      CHECK ("riskScore" >= 0 AND "riskScore" <= 100)
    `);
            yield queryRunner.query(`
      ALTER TABLE "device_fingerprints" 
      ADD CONSTRAINT "CHK_device_fingerprints_riskScore_range" 
      CHECK ("riskScore" >= 0 AND "riskScore" <= 100)
    `);
            yield queryRunner.query(`
      ALTER TABLE "ip_intelligence" 
      ADD CONSTRAINT "CHK_ip_intelligence_users_positive" 
      CHECK ("totalUsers" >= 0 AND "activeUsers" >= 0 AND "bannedUsers" >= 0)
    `);
            yield queryRunner.query(`
      ALTER TABLE "device_fingerprints" 
      ADD CONSTRAINT "CHK_device_fingerprints_users_positive" 
      CHECK ("totalUsers" >= 0 AND "activeUsers" >= 0 AND "bannedUsers" >= 0)
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS "device_fingerprints"`);
            yield queryRunner.query(`DROP TABLE IF EXISTS "ip_intelligence"`);
            yield queryRunner.query(`DROP TABLE IF EXISTS "user_connection_logs"`);
            yield queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "lastConnectionAt",
      DROP COLUMN IF EXISTS "lastConnectionIP",
      DROP COLUMN IF EXISTS "creationFingerprint",
      DROP COLUMN IF EXISTS "creationIP"
    `);
        });
    }
}
exports.Migrations1761572943335 = Migrations1761572943335;
//# sourceMappingURL=1761572943335-AddAntiBotDetectionSystem.js.map