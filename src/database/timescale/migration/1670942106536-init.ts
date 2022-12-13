import { MigrationInterface, QueryRunner } from "typeorm";

export class init1670942106536 implements MigrationInterface {
    name = 'init1670942106536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transfers" ("hash" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "collection" character varying NOT NULL, "item" numeric(78), "amount" numeric(78), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b26bd57c48ad9c485a3ae3e3635" PRIMARY KEY ("hash"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transfers"`);
    }

}
