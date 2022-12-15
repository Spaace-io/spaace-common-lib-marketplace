import { MigrationInterface, QueryRunner } from "typeorm";

export class addOrder1671029047358 implements MigrationInterface {
    name = 'addOrder1671029047358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item" character varying, "isAsk" boolean NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL, "endTime" character varying NOT NULL, "startTime" character varying NOT NULL, "collection" character varying NOT NULL, "hash" character varying NOT NULL, "signer" character varying NOT NULL, "signature" character varying NOT NULL, "strategy" character varying NOT NULL, "tokenId" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
