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
exports.AddMaterializedViewForBlockedUsers1760694458979 = void 0;
class AddMaterializedViewForBlockedUsers1760694458979 {
    constructor() {
        this.name = 'AddMaterializedViewForBlockedUsers1760694458979';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_address_lower_idx
        ON public.users (LOWER("address"));
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_email_lower_idx
        ON public.users (LOWER("email"))
        WHERE "email" IS NOT NULL;
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_discord_id_idx
        ON public.users ("discordId")
        WHERE "discordId" IS NOT NULL;
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_twitter_id_idx
        ON public.users ("twitterId")
        WHERE "twitterId" IS NOT NULL;
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_wallet_lower_idx
        ON public.identity_blacklist (LOWER("identifierValue"))
        WHERE "identifierType"='wallet';
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_email_lower_idx
        ON public.identity_blacklist (LOWER("identifierValue"))
        WHERE "identifierType"='email';
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_discord_id_idx
        ON public.identity_blacklist ("identifierValue")
        WHERE "identifierType"='discord';
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_twitter_id_idx
        ON public.identity_blacklist ("identifierValue")
        WHERE "identifierType"='twitter';
    `);
            yield queryRunner.query(`
      DROP MATERIALIZED VIEW IF EXISTS public.blocked_users_mv;
    `);
            yield queryRunner.query(`
      CREATE MATERIALIZED VIEW public.blocked_users_mv AS
      SELECT DISTINCT u."address" AS "wallet"
      FROM public.users u
      JOIN public.identity_blacklist b
        ON (
          (b."identifierType" = 'wallet'  AND LOWER(u."address") = LOWER(b."identifierValue")) OR
          (b."identifierType" = 'email'   AND LOWER(u."email")   = LOWER(b."identifierValue")) OR
          (b."identifierType" = 'discord' AND u."discordId"      = b."identifierValue")        OR
          (b."identifierType" = 'twitter' AND u."twitterId"      = b."identifierValue")
        )
      WITH NO DATA;
    `);
            yield queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS blocked_users_mv_wallet_uidx
        ON public.blocked_users_mv ("wallet");
    `);
            yield queryRunner.query(`
      REFRESH MATERIALIZED VIEW public.blocked_users_mv;
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX IF EXISTS public.blocked_users_mv_wallet_uidx;`);
            yield queryRunner.query(`DROP MATERIALIZED VIEW IF EXISTS public.blocked_users_mv;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.ibl_twitter_id_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.ibl_discord_id_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.ibl_email_lower_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.ibl_wallet_lower_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.users_twitter_id_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.users_discord_id_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.users_email_lower_idx;`);
            yield queryRunner.query(`DROP INDEX IF EXISTS public.users_address_lower_idx;`);
        });
    }
}
exports.AddMaterializedViewForBlockedUsers1760694458979 = AddMaterializedViewForBlockedUsers1760694458979;
//# sourceMappingURL=1760694458979-AddMaterializedViewForBlockedUsers.js.map