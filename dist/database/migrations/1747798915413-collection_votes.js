"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionVotes1747798915413 = void 0;
class CollectionVotes1747798915413 {
    constructor() {
        this.name = 'CollectionVotes1747798915413';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "collection_user_votes" ("collectionAddress" character(40) NOT NULL, "userAddress" character(40) NOT NULL, "voteType" smallint NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7321a99fba6c44ba60ec7ed339" PRIMARY KEY ("collectionAddress", "userAddress", "timestamp"))`);
            yield queryRunner.query(`SELECT create_hypertable ('collection_user_votes', 'timestamp', migrate_data => TRUE)`);
            yield queryRunner.query(`
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
      `);
            yield queryRunner.query(`
      SELECT
      add_continuous_aggregate_policy (
        'collection_votes',
        start_offset => NULL,
        end_offset => INTERVAL '1 h',
        schedule_interval => INTERVAL '1 h'
      )
      `);
            yield queryRunner.query(`
      ALTER MATERIALIZED VIEW collection_votes
      set (
        timescaledb.materialized_only = false
      )
      `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP MATERIALIZED VIEW collection_votes`);
            yield queryRunner.query(`DROP TABLE "collection_user_votes"`);
        });
    }
}
exports.CollectionVotes1747798915413 = CollectionVotes1747798915413;
//# sourceMappingURL=1747798915413-collection_votes.js.map