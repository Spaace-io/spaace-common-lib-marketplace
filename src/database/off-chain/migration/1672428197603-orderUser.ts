import { MigrationInterface, QueryRunner } from "typeorm";

export class orderUser1672428197603 implements MigrationInterface {
    name = 'orderUser1672428197603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("userAddress")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userAddress"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderHash" character(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_ba4700a944a033f4d97074cedfb" PRIMARY KEY ("orderHash")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "user" character(40)`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_ba4700a944a033f4d97074cedfb"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderHash"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userAddress" character(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("userAddress")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id", "userAddress")`);
    }

}
