import { MigrationInterface, QueryRunner } from "typeorm";

export class hypertable1672419222346 implements MigrationInterface {
    name = 'hypertable1672419222346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "PK_8014320111bae3fc011967a73de"`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "PK_391afc4e8fd540698f989c14d2b" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "item", "timestamp")`);
        await queryRunner.query(`SELECT create_hypertable('transfers', 'timestamp');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "PK_391afc4e8fd540698f989c14d2b"`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "PK_8014320111bae3fc011967a73de" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "item")`);
    }

}
