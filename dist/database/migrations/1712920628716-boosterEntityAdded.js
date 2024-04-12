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
exports.BoosterEntityAdded1712920628716 = void 0;
class BoosterEntityAdded1712920628716 {
    constructor() {
        this.name = 'BoosterEntityAdded1712920628716';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_users_booster" ("userTwitter" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "booster" numeric(78) NOT NULL DEFAULT '0', "expiresOn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2dfca3ef6097d491c1a7f23e6ab" PRIMARY KEY ("userTwitter", "seasonNumber"))`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_25c80580f78016d01cae153c3e4" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_25c80580f78016d01cae153c3e4"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`DROP TABLE "arena_users_booster"`);
        });
    }
}
exports.BoosterEntityAdded1712920628716 = BoosterEntityAdded1712920628716;
//# sourceMappingURL=1712920628716-boosterEntityAdded.js.map