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
exports.enums1693490169273 = void 0;
class enums1693490169273 {
    constructor() {
        this.name = 'enums1693490169273';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TYPE "public"."distributor_contract" RENAME TO "distributor_contract_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."distributor_contract" AS ENUM('TRADING_REWARDS', 'REFERRAL_REWARDS', 'LOYALTY_REWARDS')`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" ALTER COLUMN "distributor" TYPE "public"."distributor_contract" USING CONCAT(UPPER("distributor"::"text"), '_REWARDS')::"public"."distributor_contract"`);
            yield queryRunner.query(`ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."distributor_contract" USING CONCAT(UPPER("distributor"::"text"), '_REWARDS')::"public"."distributor_contract"`);
            yield queryRunner.query(`DROP TYPE "public"."distributor_contract_old"`);
            yield queryRunner.query(`ALTER TYPE "public"."order_type" RENAME TO "order_type_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."order_type" AS ENUM('ASK', 'BID', 'ENGLISH_AUCTION', 'DUTCH_AUCTION')`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "type" TYPE "public"."order_type" USING REPLACE(UPPER("type"::"text"), 'AUCTION', '_AUCTION')::"public"."order_type"`);
            yield queryRunner.query(`DROP TYPE "public"."order_type_old"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."order_type_old" AS ENUM('Ask', 'Bid', 'EnglishAuction', 'DutchAuction')`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "type" TYPE "public"."order_type_old" USING REPLACE(INITCAP("type"::"text"), '_Auction', 'Auction')::"public"."order_type_old"`);
            yield queryRunner.query(`DROP TYPE "public"."order_type"`);
            yield queryRunner.query(`ALTER TYPE "public"."order_type_old" RENAME TO "order_type"`);
            yield queryRunner.query(`CREATE TYPE "public"."distributor_contract_old" AS ENUM('Trading', 'Referral', 'Loyalty')`);
            yield queryRunner.query(`ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."distributor_contract_old" USING REPLACE(INITCAP("distributor"::"text"), '_Rewards', '')::"public"."distributor_contract_old"`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" ALTER COLUMN "distributor" TYPE "public"."distributor_contract_old" USING REPLACE(INITCAP("distributor"::"text"), '_Rewards', '')::"public"."distributor_contract_old"`);
            yield queryRunner.query(`DROP TYPE "public"."distributor_contract"`);
            yield queryRunner.query(`ALTER TYPE "public"."distributor_contract_old" RENAME TO "distributor_contract"`);
        });
    }
}
exports.enums1693490169273 = enums1693490169273;
//# sourceMappingURL=1693490169273-enums.js.map