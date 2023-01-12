import { MigrationInterface, QueryRunner } from "typeorm";

export class saleTokenId1673558238452 implements MigrationInterface {
    name = 'saleTokenId1673558238452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_354b5569d90586d67c231431396" PRIMARY KEY ("txHash", "logIdx", "collection", "timestamp")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "tokenId" numeric(78) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_354b5569d90586d67c231431396"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d" PRIMARY KEY ("txHash", "logIdx", "collection", "timestamp", "tokenId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_354b5569d90586d67c231431396" PRIMARY KEY ("txHash", "logIdx", "collection", "timestamp")`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "tokenId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_354b5569d90586d67c231431396"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d" PRIMARY KEY ("txHash", "logIdx", "collection", "tokenId", "timestamp")`);
    }

}
