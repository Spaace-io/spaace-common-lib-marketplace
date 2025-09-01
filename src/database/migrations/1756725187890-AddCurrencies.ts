import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrencies1756725187890 implements MigrationInterface {
  name = 'AddCurrencies1756725187890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token_prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "symbol" character varying(32) NOT NULL, "vsCurrency" character varying(16) NOT NULL, "price" numeric(36,18) NOT NULL, "bucketedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_42e2a1a31b88976beb8421f80f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2d96136f2a0593b1dfca5ceb0d" ON "token_prices" ("symbol", "vsCurrency", "bucketedAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2d96136f2a0593b1dfca5ceb0d"`,
    );
    await queryRunner.query(`DROP TABLE "token_prices"`);
  }
}
