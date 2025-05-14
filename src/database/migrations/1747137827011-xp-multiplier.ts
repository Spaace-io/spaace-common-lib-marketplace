import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1747137827011 implements MigrationInterface {
  name = 'Migrations1747137827011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "xp_multiplier" ("id" SERIAL NOT NULL, "userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "multiplier" numeric(78,2) NOT NULL DEFAULT '1', "metadata" jsonb NOT NULL, "expiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c80c044c4c600feda6db90e858" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_900ea15610f865f3accbfe7cba" ON "xp_multiplier" ("userAddress", "seasonNumber") `,
    );
    await queryRunner.query(
      `ALTER TABLE "xp_multiplier" ADD CONSTRAINT "FK_a2273cf2f34ea79ea1c130fec68" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "xp_multiplier" ADD CONSTRAINT "FK_905e7cb9035f4e905e502a87c96" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "xp_multiplier" DROP CONSTRAINT "FK_905e7cb9035f4e905e502a87c96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "xp_multiplier" DROP CONSTRAINT "FK_a2273cf2f34ea79ea1c130fec68"`,
    );
    await queryRunner.query(`DROP TABLE "xp_multiplier"`);

    await queryRunner.query(`DROP INDEX "IDX_900ea15610f865f3accbfe7cba"`);
  }
}
