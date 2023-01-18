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
exports.volume30d1674082358304 = void 0;
class volume30d1674082358304 {
    constructor() {
        this.name = 'volume30d1674082358304';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "volume30d" WITH (timescaledb.continuous) AS SELECT "collection", "currency", time_bucket(INTERVAL '30 days', "timestamp") AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "collection", "currency", "bucket" WITH NO DATA`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'volume30d',
                'SELECT "collection", "currency", time_bucket(INTERVAL \'30 days\', "timestamp") AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "collection", "currency", "bucket"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'volume30d', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "volume30d"`);
        });
    }
}
exports.volume30d1674082358304 = volume30d1674082358304;
//# sourceMappingURL=1674082358304-volume30d.js.map