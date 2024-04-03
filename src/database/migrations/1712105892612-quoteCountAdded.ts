import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuoteCountAdded1712105892612 implements MigrationInterface {
  name = 'QuoteCountAdded1712105892612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" ADD "quoteCount" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" DROP COLUMN "quoteCount"`,
    );
  }
}
