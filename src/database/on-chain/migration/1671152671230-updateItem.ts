import { MigrationInterface, QueryRunner } from "typeorm";

export class updateItem1671152671230 implements MigrationInterface {
    name = 'updateItem1671152671230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4ac36bcb5af17969055999c84e3"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_61b73312456c4f25a9f4102ea45" PRIMARY KEY ("tokenId")`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "isRefreshed"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "lastTimeUpdate"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "collectionId"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "primaryId"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "deployedOwner"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "countOwner"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "totalSupply"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "highOffer"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "items" ADD "collection" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_61b73312456c4f25a9f4102ea45"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" PRIMARY KEY ("tokenId", "collection")`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address")`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "deployer" character varying`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "deployer"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_6e28cea27b3667af77a587ef45b"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_61b73312456c4f25a9f4102ea45" PRIMARY KEY ("tokenId")`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "collection"`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "highOffer" character varying`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "totalSupply" integer`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "countOwner" character varying`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "deployedOwner" character varying`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "items" ADD "primaryId" character varying`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a" UNIQUE ("primaryId")`);
        await queryRunner.query(`ALTER TABLE "items" ADD "collectionId" character varying`);
        await queryRunner.query(`ALTER TABLE "items" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "items" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "items" ADD "lastTimeUpdate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "items" ADD "isRefreshed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "items" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_61b73312456c4f25a9f4102ea45"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4ac36bcb5af17969055999c84e3" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
