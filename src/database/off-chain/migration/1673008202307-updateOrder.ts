import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateOrder1673008202307 implements MigrationInterface {
  name = 'updateOrder1673008202307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "item"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "PK_ba4700a944a033f4d97074cedfb"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderHash"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "hash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "tokenId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "user" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "user" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "tokenId"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "PK_13ab9c024e81573c05451b9004f"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "hash"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "orderHash" character(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "PK_ba4700a944a033f4d97074cedfb" PRIMARY KEY ("orderHash")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "item" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
