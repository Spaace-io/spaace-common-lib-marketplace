import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1671136504739 implements MigrationInterface {
    name = 'updateUser1671136504739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("address")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" integer NOT NULL DEFAULT nextval('user_id_seq')`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

}
