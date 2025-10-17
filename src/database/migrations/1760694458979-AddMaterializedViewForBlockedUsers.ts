import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMaterializedViewForBlockedUsers1760694458979
  implements MigrationInterface
{
  name = 'AddMaterializedViewForBlockedUsers1760694458979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_address_lower_idx
        ON public.users (LOWER("address"));
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_email_lower_idx
        ON public.users (LOWER("email"))
        WHERE "email" IS NOT NULL;
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_discord_id_idx
        ON public.users ("discordId")
        WHERE "discordId" IS NOT NULL;
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS users_twitter_id_idx
        ON public.users ("twitterId")
        WHERE "twitterId" IS NOT NULL;
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_wallet_lower_idx
        ON public.identity_blacklist (LOWER("identifierValue"))
        WHERE "identifierType"='wallet';
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_email_lower_idx
        ON public.identity_blacklist (LOWER("identifierValue"))
        WHERE "identifierType"='email';
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_discord_id_idx
        ON public.identity_blacklist ("identifierValue")
        WHERE "identifierType"='discord';
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ibl_twitter_id_idx
        ON public.identity_blacklist ("identifierValue")
        WHERE "identifierType"='twitter';
    `);

    await queryRunner.query(`
      DROP MATERIALIZED VIEW IF EXISTS public.blocked_users_mv;
    `);
    await queryRunner.query(`
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

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS blocked_users_mv_wallet_uidx
        ON public.blocked_users_mv ("wallet");
    `);

    await queryRunner.query(`
      REFRESH MATERIALIZED VIEW public.blocked_users_mv;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS public.blocked_users_mv_wallet_uidx;`,
    );
    await queryRunner.query(
      `DROP MATERIALIZED VIEW IF EXISTS public.blocked_users_mv;`,
    );

    await queryRunner.query(`DROP INDEX IF EXISTS public.ibl_twitter_id_idx;`);
    await queryRunner.query(`DROP INDEX IF EXISTS public.ibl_discord_id_idx;`);
    await queryRunner.query(`DROP INDEX IF EXISTS public.ibl_email_lower_idx;`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS public.ibl_wallet_lower_idx;`,
    );

    await queryRunner.query(
      `DROP INDEX IF EXISTS public.users_twitter_id_idx;`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS public.users_discord_id_idx;`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS public.users_email_lower_idx;`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS public.users_address_lower_idx;`,
    );
  }
}
