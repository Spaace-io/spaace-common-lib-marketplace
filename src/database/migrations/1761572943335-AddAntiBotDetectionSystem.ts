import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1761572943335 implements MigrationInterface {
  name = 'Migrations1761572943335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "creationIP" VARCHAR(45),
      ADD COLUMN "creationFingerprint" VARCHAR(100),
      ADD COLUMN "lastConnectionIP" VARCHAR(45),
      ADD COLUMN "lastConnectionAt" TIMESTAMPTZ
    `);

    await queryRunner.query(`
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

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_userAddress" 
      ON "user_connection_logs" ("userAddress")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_ipAddress" 
      ON "user_connection_logs" ("ipAddress")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_fingerprint" 
      ON "user_connection_logs" ("fingerprint")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_timestamp" 
      ON "user_connection_logs" ("timestamp" DESC)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_actionType" 
      ON "user_connection_logs" ("actionType")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_suspicious" 
      ON "user_connection_logs" ("suspicious") 
      WHERE "suspicious" = true
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_connection_logs_composite" 
      ON "user_connection_logs" ("userAddress", "timestamp" DESC)
    `);

    await queryRunner.query(`
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

    await queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_riskScore" 
      ON "ip_intelligence" ("riskScore" DESC)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_totalUsers" 
      ON "ip_intelligence" ("totalUsers" DESC)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_isBlacklisted" 
      ON "ip_intelligence" ("isBlacklisted") 
      WHERE "isBlacklisted" = true
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_ipType" 
      ON "ip_intelligence" ("ipType")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_ip_intelligence_countryCode" 
      ON "ip_intelligence" ("countryCode")
    `);

    await queryRunner.query(`
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

    await queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_riskScore" 
      ON "device_fingerprints" ("riskScore" DESC)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_totalUsers" 
      ON "device_fingerprints" ("totalUsers" DESC)
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_suspicious" 
      ON "device_fingerprints" ("suspicious") 
      WHERE "suspicious" = true
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_device_fingerprints_lastSeen" 
      ON "device_fingerprints" ("lastSeen" DESC)
    `);

    await queryRunner.query(`
      ALTER TABLE "ip_intelligence" 
      ADD CONSTRAINT "CHK_ip_intelligence_riskScore_range" 
      CHECK ("riskScore" >= 0 AND "riskScore" <= 100)
    `);

    await queryRunner.query(`
      ALTER TABLE "device_fingerprints" 
      ADD CONSTRAINT "CHK_device_fingerprints_riskScore_range" 
      CHECK ("riskScore" >= 0 AND "riskScore" <= 100)
    `);

    await queryRunner.query(`
      ALTER TABLE "ip_intelligence" 
      ADD CONSTRAINT "CHK_ip_intelligence_users_positive" 
      CHECK ("totalUsers" >= 0 AND "activeUsers" >= 0 AND "bannedUsers" >= 0)
    `);

    await queryRunner.query(`
      ALTER TABLE "device_fingerprints" 
      ADD CONSTRAINT "CHK_device_fingerprints_users_positive" 
      CHECK ("totalUsers" >= 0 AND "activeUsers" >= 0 AND "bannedUsers" >= 0)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "device_fingerprints"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ip_intelligence"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user_connection_logs"`);

    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "lastConnectionAt",
      DROP COLUMN IF EXISTS "lastConnectionIP",
      DROP COLUMN IF EXISTS "creationFingerprint",
      DROP COLUMN IF EXISTS "creationIP"
    `);
  }
}
