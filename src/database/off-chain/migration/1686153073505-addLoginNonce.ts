import { MigrationInterface, QueryRunner } from "typeorm";

export class addLoginNonce1686153073505 implements MigrationInterface {
    name = 'addLoginNonce1686153073505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login_nonce" ("nonce" character(32) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "user" character(40), CONSTRAINT "PK_b563be4d1127e83321bd33c9d16" PRIMARY KEY ("nonce"))`);
        await queryRunner.query(`ALTER TABLE "login_nonce" ADD CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_nonce" DROP CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6"`);
        await queryRunner.query(`DROP TABLE "login_nonce"`);
    }

}
