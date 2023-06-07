import { MigrationInterface, QueryRunner } from "typeorm";

export class addLoginNonce1686153073505 implements MigrationInterface {
    name = 'addLoginNonce1686153073505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("address" character(40) NOT NULL, CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("address"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("hash" character(64) NOT NULL, "user" character(40) NOT NULL, "collection" character varying NOT NULL, "tokenId" character varying, "isAsk" boolean NOT NULL, "price" numeric(78) NOT NULL, "currency" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "signature" character varying NOT NULL, CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash"))`);
        await queryRunner.query(`CREATE TABLE "login_nonce" ("nonce" character(32) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "user" character(40), CONSTRAINT "PK_b563be4d1127e83321bd33c9d16" PRIMARY KEY ("nonce"))`);
        await queryRunner.query(`ALTER TABLE "login_nonce" ADD CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_nonce" DROP CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6"`);
        await queryRunner.query(`DROP TABLE "login_nonce"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
