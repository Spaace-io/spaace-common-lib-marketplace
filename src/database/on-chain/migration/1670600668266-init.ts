import { MigrationInterface, QueryRunner } from "typeorm";

export class init1670600668266 implements MigrationInterface {
    name = 'init1670600668266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collection" ("hash" character varying NOT NULL, CONSTRAINT "PK_255b55fb2cb000f0a8eb25335f6" PRIMARY KEY ("hash"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "collection"`);
    }

}
