import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscordUserData1756394062727 implements MigrationInterface {
  name = 'AddDiscordUserData1756394062727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "discordId" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "discordUsername" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "discordAccessToken" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "discordRefreshToken" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "discordRefreshToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "discordAccessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "discordUsername"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discordId"`);
  }
}
