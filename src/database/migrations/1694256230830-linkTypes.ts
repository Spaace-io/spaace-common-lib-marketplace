import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkTypes1694256230830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "collections" SET "links" = (SELECT json_agg(json_build_object('url', "l"->'url', 'type', UPPER("l"->>'type'))) FROM jsonb_array_elements("links") AS "l") WHERE jsonb_array_length("links") != 0;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "collections" SET "links" = (SELECT json_agg(json_build_object('url', "l"->'url', 'type', LOWER("l"->>'type'))) FROM jsonb_array_elements("links") AS "l") WHERE jsonb_array_length("links") != 0;`,
    );
  }
}
