import { MigrationInterface, QueryRunner } from "typeorm";

export class addLoginNonce1686152338407 implements MigrationInterface {
    name = 'addLoginNonce1686152338407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login_nonce" ("nonce" character(32) NOT NULL, CONSTRAINT "PK_b563be4d1127e83321bd33c9d16" PRIMARY KEY ("nonce"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_nonce" DROP CONSTRAINT "PK_b563be4d1127e83321bd33c9d16"`);
        await queryRunner.query(`ALTER TABLE "login_nonce" DROP COLUMN "nonce"`);
        await queryRunner.query(`DROP TABLE "login_nonce"`);
    }

}
