import { MigrationInterface, QueryRunner } from "typeorm";

export class rarity1673456731365 implements MigrationInterface {
    name = 'rarity1673456731365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD "rarity" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarity"`);
    }

}
