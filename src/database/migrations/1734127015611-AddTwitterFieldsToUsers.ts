import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTwittterFieldsToUsers1734127015611
  implements MigrationInterface
{
  name = 'AddTwittterFieldsToUsers1734127015611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "users"
          ADD COLUMN "twitterUsername" TEXT NULL,
          ADD COLUMN "twitterId" TEXT NULL,
          ADD COLUMN "twitterSecretToken" TEXT NULL,
          ADD COLUMN "twitterAccessToken" TEXT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "users"
          DROP COLUMN "twitterUsername",
          DROP COLUMN "twitterId",
          DROP COLUMN "twitterSecretToken",
          DROP COLUMN "twitterAccessToken"
        `);
  }
}
