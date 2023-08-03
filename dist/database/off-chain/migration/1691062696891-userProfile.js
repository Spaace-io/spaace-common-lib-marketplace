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
exports.userProfile1691062696891 = void 0;
class userProfile1691062696891 {
    constructor() {
        this.name = 'userProfile1691062696891';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "name" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "biography" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "imageUrl" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "bannerUrl" text`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" SET DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bannerUrl"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imageUrl"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "biography"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        });
    }
}
exports.userProfile1691062696891 = userProfile1691062696891;
//# sourceMappingURL=1691062696891-userProfile.js.map