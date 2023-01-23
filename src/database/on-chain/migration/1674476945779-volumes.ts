import { MigrationInterface, QueryRunner } from 'typeorm';

export class volumes1674476945779 implements MigrationInterface {
  name = 'volumes1674476945779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume24h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "change24h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume7d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "change7d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume30d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "change30d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorPrice" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange24h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange7d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange30d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "address" TYPE character(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address")`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "deployer" TYPE character(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_6e28cea27b3667af77a587ef45b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "collection" TYPE character(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" PRIMARY KEY ("tokenId", "collection")`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_6e28cea27b3667af77a587ef45b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "collection" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" PRIMARY KEY ("tokenId", "collection")`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "deployer" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "address" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address")`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorPrice"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "change30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volume30d"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "change7d"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume7d"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "change24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volume24h"`,
    );
  }
}
