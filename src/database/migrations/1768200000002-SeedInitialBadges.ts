import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialBadges1768200000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. OG Badge
    const [ogBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('OG', 'loyalty', 'OG', 'Connected wallet to Spaace before Sept 15th', false, 1, 10, 'legendary')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'CONNECTED_BEFORE_DATE', '{"cutoff_timestamp": "2025-09-15T00:00:00Z"}')
    `,
      [ogBadge.id],
    );

    // 2. Gm Badge
    const [gmBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('GM', 'activity', 'Gm', 'Completed a daily quest 15 days in a row', false, 1, 20, 'rare')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'DAILY_QUEST_STREAK', '{"min_days": 15}')
    `,
      [gmBadge.id],
    );

    // 3. Collector Badge
    const [collectorBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('COLLECTOR', 'collector', 'Collector', 'Bought from 10 different collections on Spaace', false, 1, 30, 'rare')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'BUY_DISTINCT_COLLECTIONS_ON_SPAACE', '{"min_collections": 10}')
    `,
      [collectorBadge.id],
    );

    // 4. Loyal Collector Badge
    const [loyalCollectorBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('LOYAL_COLLECTOR', 'collector', 'Loyal Collector', 'Bought 10 NFTs from the same collection on Spaace', false, 1, 40, 'epic')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'BUY_SAME_COLLECTION_COUNT', '{"min_count": 10}')
    `,
      [loyalCollectorBadge.id],
    );

    // 5. Fanatic Badge
    const [fanaticBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('FANATIC', 'collector', 'Fanatic', 'Bought 50 NFTs from the same collection on Spaace', false, 1, 50, 'epic')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'BUY_SAME_COLLECTION_COUNT', '{"min_count": 50}')
    `,
      [fanaticBadge.id],
    );

    // 6. Collector Maniac Badge
    const [collectorManiacBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('COLLECTOR_MANIAC', 'collector', 'Collector Maniac', 'Completed "Buy 500 NFTs" quest', false, 1, 60, 'legendary')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'QUEST_COMPLETED', '{"quest_code": "BUY_500_NFTS"}')
    `,
      [collectorManiacBadge.id],
    );

    // 7. Volume God Badge
    const [volumeGodBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('VOLUME_GOD', 'trading', 'Volume God', 'Completed "Reach 100 ETH Trading Volume" quest', false, 1, 70, 'legendary')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'QUEST_COMPLETED', '{"quest_code": "TRADING_VOLUME_100_ETH"}')
    `,
      [volumeGodBadge.id],
    );

    // 8. Lister Lord Badge
    const [listerLordBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('LISTER_LORD', 'trading', 'Lister Lord', 'Completed "List a Prime NFT" quest 500 times', false, 1, 80, 'epic')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'QUEST_COMPLETED_COUNT', '{"quest_code": "LIST_A_PRIME_NFT", "min_completions": 500}')
    `,
      [listerLordBadge.id],
    );

    // 9. Seller Master Badge
    const [sellerMasterBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('SELLER_MASTER', 'trading', 'Seller Master', 'Completed "Sell 500 NFTs" quest', false, 1, 90, 'epic')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'QUEST_COMPLETED', '{"quest_code": "SELL_500_NFTS"}')
    `,
      [sellerMasterBadge.id],
    );

    // 10. Prescriber Badge
    const [prescriberBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('PRESCRIBER', 'social', 'Prescriber', 'Referred 10+ active friends', false, 1, 100, 'epic')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'ACTIVE_REFERRALS_COUNT', '{"min_count": 10}')
    `,
      [prescriberBadge.id],
    );

    // 11. Loyal Badge
    const [loyalBadge] = await queryRunner.query(`
      INSERT INTO "badges" (code, category, name, description, is_repeatable, max_count, sort_order, rarity)
      VALUES ('LOYAL', 'loyalty', 'Loyal', 'Completed a daily quest 30 days in a row', false, 1, 110, 'epic')
      RETURNING id
    `);

    await queryRunner.query(
      `
      INSERT INTO "badge_conditions" (badge_id, condition_type, params_json)
      VALUES ($1, 'DAILY_QUEST_STREAK', '{"min_days": 30}')
    `,
      [loyalBadge.id],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete all initial badges and their conditions (cascade will handle conditions)
    await queryRunner.query(`
      DELETE FROM "badges" 
      WHERE code IN (
        'OG', 'GM', 'COLLECTOR', 'LOYAL_COLLECTOR', 'FANATIC',
        'COLLECTOR_MANIAC', 'VOLUME_GOD', 'LISTER_LORD', 
        'SELLER_MASTER', 'PRESCRIBER', 'LOYAL'
      )
    `);
  }
}
