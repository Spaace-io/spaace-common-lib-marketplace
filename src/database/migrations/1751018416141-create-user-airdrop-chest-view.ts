import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAirdropChestView1751018416141
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE VIEW "user_airdrop_chest_view" AS
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
          FROM "airdrop_users_chests" uc
          INNER JOIN "airdrop_chests" c ON c.id = uc."chestId"
          WHERE uc.address = u.address
        ) as chests
      FROM "airdrop_users" u
      INNER JOIN "airdrop_tiers" t ON t.id = u."tierId"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP VIEW IF EXISTS "user_airdrop_chest_view"');
  }
}
