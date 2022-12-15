import { MigrationInterface, QueryRunner } from "typeorm";

export class renameTables1671135758032 implements MigrationInterface {
    name = 'renameTables1671135758032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "orders"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "order"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
    }

}
