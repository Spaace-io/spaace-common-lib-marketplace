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
exports.UserDiscordRankSync1766058414638 = void 0;
class UserDiscordRankSync1766058414638 {
    constructor() {
        this.name = 'UserDiscordRankSync1766058414638';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE public.discord_tier AS ENUM ('SILVER','GOLD','PLATINUM','DIAMOND');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
            yield queryRunner.query(`
      CREATE TABLE "user_discord_rank_sync" (
        "userAddress" character(40) NOT NULL,
        "seasonNumber" text NOT NULL,
        "discordId" text NOT NULL,
        "lastSyncedTier" public.discord_tier,
        "lastSyncedAt" TIMESTAMP WITH TIME ZONE,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_56a40e383e804c9a14618870d2f" PRIMARY KEY ("userAddress", "seasonNumber")
      )
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_d288ace1539e5a1b34ccbfa379"
      ON "user_discord_rank_sync" ("seasonNumber", "updatedAt")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_428617002f42644b64cf7129fe"
      ON "user_discord_rank_sync" ("discordId")
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS "user_discord_rank_sync"`);
            yield queryRunner.query(`DROP TYPE IF EXISTS public.discord_tier`);
        });
    }
}
exports.UserDiscordRankSync1766058414638 = UserDiscordRankSync1766058414638;
//# sourceMappingURL=1766058414638-UserDiscordRankSync.js.map