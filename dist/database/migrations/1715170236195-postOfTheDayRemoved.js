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
exports.PostOfTheDayRemoved1715170236195 = void 0;
class PostOfTheDayRemoved1715170236195 {
    constructor() {
        this.name = 'PostOfTheDayRemoved1715170236195';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_7470b0c6f0e975f478662a660b"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "postOfTheDay"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "postOfTheDay" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`CREATE INDEX "IDX_7470b0c6f0e975f478662a660b" ON "arena_spaace_tweet" ("postOfTheDay") `);
        });
    }
}
exports.PostOfTheDayRemoved1715170236195 = PostOfTheDayRemoved1715170236195;
//# sourceMappingURL=1715170236195-postOfTheDayRemoved.js.map