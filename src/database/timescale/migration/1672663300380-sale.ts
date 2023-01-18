import { MigrationInterface, QueryRunner } from 'typeorm';

export class sale1672663300380 implements MigrationInterface {
  name = 'sale1672663300380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "orderHash" character(64) NOT NULL, "collection" character varying NOT NULL, "tokenId" character varying NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "from" character(40) NOT NULL, "to" character(40) NOT NULL, "price" numeric(78) NOT NULL, "currency" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d" PRIMARY KEY ("txHash", "logIdx", "collection", "tokenId", "timestamp"))`,
    );
    await queryRunner.query(`SELECT create_hypertable('sales', 'timestamp');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sales"`);
  }
}
