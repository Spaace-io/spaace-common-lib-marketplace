import { MigrationInterface, QueryRunner } from 'typeorm';

export class loginNonce1686840204748 implements MigrationInterface {
  name = 'loginNonce1686840204748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_nonce" DROP CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_nonce" RENAME COLUMN "user" TO "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_nonce" ALTER COLUMN "address" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_nonce" ALTER COLUMN "address" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_nonce" RENAME COLUMN "address" TO "user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_nonce" ADD CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
