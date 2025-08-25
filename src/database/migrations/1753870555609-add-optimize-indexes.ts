import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1753870555609 implements MigrationInterface {
  name = 'Migrations1753870555609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_user_xp_log_referral_performance" ON user_xp_log 
     ("userAddress", "source", "seasonNumber", "createdAt") 
     WHERE source = 'REFERRAL';`,
    );

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_users_fee_commission_referrer_address" 
  ON users_fee_commission ("referrerAddress");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_user_xp_log_referral_performance";`,
    );

    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_users_fee_commission_referrer_address";`,
    );
  }
}
