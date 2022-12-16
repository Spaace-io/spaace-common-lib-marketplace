import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOrder1671153047294 implements MigrationInterface {
    name = 'updateOrder1671153047294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "signer"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "strategy"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userAddress" character(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id", "userAddress")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "price" numeric(78) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "startTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "endTime" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "endTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "startTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userAddress"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updated_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "tokenId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "strategy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "signer" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "hash" character varying NOT NULL`);
    }

}
