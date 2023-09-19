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
exports.rewardPeriods1690538968468 = void 0;
class rewardPeriods1690538968468 {
    constructor() {
        this.name = 'rewardPeriods1690538968468';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."reward_period_type" AS ENUM('Trading', 'Referral')`);
            yield queryRunner.query(`CREATE TABLE "reward_periods" ("distributor" "public"."reward_period_type" NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, "amount" numeric(78) NOT NULL, "distributed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6babd6a5403539152e46098b0b4" PRIMARY KEY ("distributor", "startTime"))`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" DROP CONSTRAINT "PK_8803e4d34c3dae3dc7a4987cf3a"`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" ADD CONSTRAINT "PK_7f2dd6f32fc52c74ade6c89ae72" PRIMARY KEY ("userAddress", "distributor", "amount")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" DROP CONSTRAINT "PK_7f2dd6f32fc52c74ade6c89ae72"`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" ADD CONSTRAINT "PK_8803e4d34c3dae3dc7a4987cf3a" PRIMARY KEY ("userAddress", "distributor", "amount", "timestamp")`);
            yield queryRunner.query(`DROP TABLE "reward_periods"`);
            yield queryRunner.query(`DROP TYPE "public"."reward_period_type"`);
        });
    }
}
exports.rewardPeriods1690538968468 = rewardPeriods1690538968468;
//# sourceMappingURL=1690538968468-rewardPeriods.js.map