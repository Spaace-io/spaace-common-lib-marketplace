import { MigrationInterface, QueryRunner } from "typeorm";

export class saleAddressLength1673562362615 implements MigrationInterface {
    name = 'saleAddressLength1673562362615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "collection" TYPE character(40)`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "currency" TYPE character(40)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "collection" TYPE character varying`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "currency" TYPE character varying`);
    }

}
