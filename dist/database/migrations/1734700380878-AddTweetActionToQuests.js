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
exports.AddTweetActionToQuests1734700380878 = void 0;
class AddTweetActionToQuests1734700380878 {
    constructor() {
        this.name = 'AddTweetActionToQuests1734700380878';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "tweet_action_enum" AS ENUM ('LIKE', 'REPLY', 'REPOST')`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "tweetAction" "tweet_action_enum" DEFAULT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "tweetAction"`);
            yield queryRunner.query(`DROP TYPE "tweet_action_enum"`);
        });
    }
}
exports.AddTweetActionToQuests1734700380878 = AddTweetActionToQuests1734700380878;
//# sourceMappingURL=1734700380878-AddTweetActionToQuests.js.map