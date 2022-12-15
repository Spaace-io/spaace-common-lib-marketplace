import { MigrationInterface, QueryRunner } from "typeorm";

export class createLatestBlock1671117193530 implements MigrationInterface {
    name = 'createLatestBlock1671117193530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "latest_block" ("pk" boolean NOT NULL DEFAULT true, "number" integer NOT NULL, "hash" character(64) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b31af3e9abf8a0d5b6984dff44" PRIMARY KEY ("pk"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "latest_block"`);
    }

}
