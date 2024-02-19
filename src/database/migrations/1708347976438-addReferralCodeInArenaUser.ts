import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReferralCodeInArenaUser1708347976438
  implements MigrationInterface
{
  name = 'AddReferralCodeInArenaUser1708347976438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_users" ("twitterUsername" text NOT NULL, "name" text, "imageUrl" text, "referralCode" text NOT NULL, "referrerUsername" text, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac" UNIQUE ("referralCode"), CONSTRAINT "PK_5369e233e18e92fecb08b7991a5" PRIMARY KEY ("twitterUsername"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e97776d3e4e59017d57714bf39c" FOREIGN KEY ("referrerUsername") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e97776d3e4e59017d57714bf39c"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users"`);
  }
}
