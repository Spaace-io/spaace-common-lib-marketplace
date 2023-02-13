import { MigrationInterface, QueryRunner } from "typeorm";

export class itemAttributesPK1676333537408 implements MigrationInterface {
    name = 'itemAttributesPK1676333537408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_13e5c8a2d8634c46d1591445e61"`);
        await queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_4b8decd338cc6c75234f320c0bc" PRIMARY KEY ("collection", "tokenId", "trait")`);
        await queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "UQ_f3f325a3290043d05e25d9a4d2b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "UQ_f3f325a3290043d05e25d9a4d2b" UNIQUE ("trait")`);
        await queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_4b8decd338cc6c75234f320c0bc"`);
        await queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_13e5c8a2d8634c46d1591445e61" PRIMARY KEY ("collection", "tokenId")`);
    }

}
