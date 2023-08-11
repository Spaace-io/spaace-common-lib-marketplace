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
exports.userLoyalty1691747087886 = void 0;
class userLoyalty1691747087886 {
    constructor() {
        this.name = 'userLoyalty1691747087886';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_loyalties" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "points" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_5254410832e753bed54603862d8" PRIMARY KEY ("userAddress", "seasonNumber"))`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyRewardsClaimed"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyRewards"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyPoints"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "loyaltyPoints" numeric(78,0) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "loyaltyRewards" numeric(78,0) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "loyaltyRewardsClaimed" numeric(78,0) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`DROP TABLE "user_loyalties"`);
        });
    }
}
exports.userLoyalty1691747087886 = userLoyalty1691747087886;
//# sourceMappingURL=1691747087886-userLoyalty.js.map