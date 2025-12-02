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
exports.ReferralRewardClaims1764688943000 = void 0;
class ReferralRewardClaims1764688943000 {
    constructor() {
        this.name = 'ReferralRewardClaims1764688943000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create enum for claim status
            yield queryRunner.query(`CREATE TYPE "claim_status" AS ENUM('pending', 'completed', 'failed')`);
            // Create referral_reward_claims table
            yield queryRunner.query(`CREATE TABLE "referral_reward_claims" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "referrerAddress" character(40) NOT NULL,
        "recipientAddress" character(40) NOT NULL,
        "amount" numeric(78) NOT NULL,
        "status" "claim_status" NOT NULL DEFAULT 'pending',
        "txHash" character(66),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "completedAt" TIMESTAMP,
        CONSTRAINT "PK_referral_reward_claims" PRIMARY KEY ("id")
      )`);
            // Create index for checking pending claims by referrer
            yield queryRunner.query(`CREATE INDEX "IDX_referral_reward_claims_referrer_status" 
       ON "referral_reward_claims" ("referrerAddress", "status")`);
            // Create index for calculating total claimed by referrer
            yield queryRunner.query(`CREATE INDEX "IDX_referral_reward_claims_referrer" 
       ON "referral_reward_claims" ("referrerAddress")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop indexes
            yield queryRunner.query(`DROP INDEX IF EXISTS "IDX_referral_reward_claims_referrer"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "IDX_referral_reward_claims_referrer_status"`);
            // Drop table
            yield queryRunner.query(`DROP TABLE "referral_reward_claims"`);
            // Drop enum
            yield queryRunner.query(`DROP TYPE "claim_status"`);
        });
    }
}
exports.ReferralRewardClaims1764688943000 = ReferralRewardClaims1764688943000;
//# sourceMappingURL=1764688943000-referral-reward-claims.js.map