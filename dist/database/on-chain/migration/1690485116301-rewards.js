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
exports.rewards1690485116301 = void 0;
class rewards1690485116301 {
    constructor() {
        this.name = 'rewards1690485116301';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "trading_rewards"`);
            yield queryRunner.query(`DROP TABLE "referral_rewards"`);
            yield queryRunner.query(`CREATE TABLE "staking_rewards" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "pool" character(40) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, CONSTRAINT "PK_851c6379084b24f40772bedcc0f" PRIMARY KEY ("txHash", "logIdx"))`);
            yield queryRunner.query(`CREATE TYPE "public"."distributor_contract" AS ENUM('Trading', 'Referral', 'Loyalty')`);
            yield queryRunner.query(`CREATE TABLE "distributor_rewards" ("userAddress" character(40) NOT NULL, "distributor" "public"."distributor_contract" NOT NULL, "amount" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "harvestTxHash" character(64), "harvestLogIdx" numeric(78), "harvestTimestamp" TIMESTAMP, CONSTRAINT "PK_8803e4d34c3dae3dc7a4987cf3a" PRIMARY KEY ("userAddress", "distributor", "amount", "timestamp"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "distributor_rewards"`);
            yield queryRunner.query(`DROP TYPE "public"."distributor_contract"`);
            yield queryRunner.query(`DROP TABLE "staking_rewards"`);
            yield queryRunner.query(`CREATE TABLE "referral_rewards" ("userAddress" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "referrer" character(40) NOT NULL, "referrerAmount" numeric(78) NOT NULL, "referredAmount" numeric(78) NOT NULL, CONSTRAINT "PK_747a45a7f86106e2925a99113da" PRIMARY KEY ("user", "date", "referrer"))`);
            yield queryRunner.query(`CREATE TABLE "trading_rewards" ("userAddress" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "buyAmount" numeric(78) NOT NULL, "sellAmount" numeric(78) NOT NULL, CONSTRAINT "PK_afc958bd5194d51375325441597" PRIMARY KEY ("user", "date"))`);
        });
    }
}
exports.rewards1690485116301 = rewards1690485116301;
//# sourceMappingURL=1690485116301-rewards.js.map