import { MigrationInterface, QueryRunner } from "typeorm";

export class totalSupply1671286912326 implements MigrationInterface {
    name = 'totalSupply1671286912326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections" ADD "totalSupply" numeric(78)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "totalSupply"`);
    }

}
