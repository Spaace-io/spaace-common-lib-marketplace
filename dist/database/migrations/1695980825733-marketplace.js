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
exports.marketplace1695980825733 = void 0;
class marketplace1695980825733 {
    constructor() {
        this.name = 'marketplace1695980825733';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."marketplace" AS ENUM('SPAACE', 'OPENSEA', 'BLUR')`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "marketplace" "public"."marketplace" NOT NULL DEFAULT 'SPAACE'::marketplace`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "marketplace" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD "marketplace" "public"."marketplace"`);
            yield queryRunner.query(`
      UPDATE "sales" AS "sale" SET "marketplace" = COALESCE((SELECT "order"."marketplace" FROM "orders" AS "order" WHERE "order"."hash" = "sale"."orderHash"), 'OPENSEA'::marketplace)
    `);
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "marketplace" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "marketplace"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "marketplace"`);
            yield queryRunner.query(`DROP TYPE "public"."marketplace"`);
        });
    }
}
exports.marketplace1695980825733 = marketplace1695980825733;
//# sourceMappingURL=1695980825733-marketplace.js.map