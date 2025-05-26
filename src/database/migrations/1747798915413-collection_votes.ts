import { MigrationInterface, QueryRunner } from 'typeorm';

export class CollectionVotes1747798915413 implements MigrationInterface {
  name = 'CollectionVotes1747798915413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "collection_user_votes" ("collectionAddress" character(40) NOT NULL, "userAddress" character(40) NOT NULL, "voteType" smallint NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7321a99fba6c44ba60ec7ed339" PRIMARY KEY ("collectionAddress", "userAddress", "timestamp"))`,
    );

    await queryRunner.query(
      `SELECT create_hypertable ('collection_user_votes', 'timestamp', migrate_data => TRUE)`,
    );

    await queryRunner.query(
      `
      CREATE MATERIALIZED VIEW collection_votes
      WITH (timescaledb.continuous) AS
      SELECT
        time_bucket ('30 days'::interval, timestamp) as bucket_30d,
        "collectionAddress",
        sum(case when "voteType" = 1 then 1 else 0 end) as "upvotes",
        sum(case when "voteType" = -1 then 1 else 0 end) as "downvotes",
        sum("voteType") as "score"
      FROM collection_user_votes
      GROUP BY
        "collectionAddress",
        bucket_30d
      WITH NO DATA
      `,
    );
    await queryRunner.query(
      `
      SELECT
      add_continuous_aggregate_policy (
        'collection_votes',
        start_offset => NULL,
        end_offset => INTERVAL '1 h',
        schedule_interval => INTERVAL '1 h'
      )
      `,
    );
    await queryRunner.query(
      `
      ALTER MATERIALIZED VIEW collection_votes
      set (
        timescaledb.materialized_only = false
      )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP MATERIALIZED VIEW collection_votes`);
    await queryRunner.query(`DROP TABLE "collection_user_votes"`);
  }
}
