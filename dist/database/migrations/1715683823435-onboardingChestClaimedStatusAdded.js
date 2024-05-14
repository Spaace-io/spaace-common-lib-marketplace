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
exports.OnboardingChestClaimedStatusAdded1715683823435 = void 0;
class OnboardingChestClaimedStatusAdded1715683823435 {
    constructor() {
        this.name = 'OnboardingChestClaimedStatusAdded1715683823435';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "isOnboardingChestClaimed" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "isOnboardingChestClaimed"`);
        });
    }
}
exports.OnboardingChestClaimedStatusAdded1715683823435 = OnboardingChestClaimedStatusAdded1715683823435;
//# sourceMappingURL=1715683823435-onboardingChestClaimedStatusAdded.js.map