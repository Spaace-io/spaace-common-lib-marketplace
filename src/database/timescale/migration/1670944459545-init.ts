import { MigrationInterface, QueryRunner } from "typeorm";

export class init1670944459545 implements MigrationInterface {
    name = 'init1670944459545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transfers" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "from" character(40) NOT NULL, "to" character(40) NOT NULL, "collection" character(40) NOT NULL, "item" numeric(78), "amount" numeric(78), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dbae301f250e9d4435104066841" PRIMARY KEY ("txHash", "logIdx"))`);
        await queryRunner.query(`SELECT create_hypertable('transfers', 'timestamp');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transfers"`);
    }

}
