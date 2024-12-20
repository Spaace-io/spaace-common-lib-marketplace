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
exports.AddTweetId1734692960968 = void 0;
class AddTweetId1734692960968 {
    constructor() {
        this.name = 'AddTweetId1734692960968';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "quests"
      ADD COLUMN "tweetId" text DEFAULT NULL
    `);
            yield queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "tweetId" text DEFAULT NULL
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "tweetId"
    `);
            yield queryRunner.query(`
      ALTER TABLE "quests"
      DROP COLUMN "tweetId"
    `);
        });
    }
}
exports.AddTweetId1734692960968 = AddTweetId1734692960968;
//# sourceMappingURL=1734692960968-AddTweetId.js.map