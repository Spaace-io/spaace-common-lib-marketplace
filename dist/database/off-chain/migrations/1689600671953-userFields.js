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
exports.userFields1689600671953 = void 0;
class userFields1689600671953 {
    constructor() {
        this.name = 'userFields1689600671953';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "season_ranks" DROP CONSTRAINT "FK_922d92212ab5e456b7c4cd659b1"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "FK_8e507c23ab7f443020bd75a072c"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_97e711cec61f29f3fdf1a82e60a"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_e09c02f2ccf045e5fe377e617a1"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_ac8319fc70ddd862d6476100b57"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" ADD CONSTRAINT "FK_3de617019fd4e649528fc62ec68" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_716a446b06578c914ef61ad1fd6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_f07c0d5dd258518c077b53950f5" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_f07c0d5dd258518c077b53950f5"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_716a446b06578c914ef61ad1fd6"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2"`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" DROP CONSTRAINT "FK_3de617019fd4e649528fc62ec68"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_ac8319fc70ddd862d6476100b57" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_e09c02f2ccf045e5fe377e617a1" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_97e711cec61f29f3fdf1a82e60a" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "FK_8e507c23ab7f443020bd75a072c" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" ADD CONSTRAINT "FK_922d92212ab5e456b7c4cd659b1" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.userFields1689600671953 = userFields1689600671953;
//# sourceMappingURL=1689600671953-userFields.js.map