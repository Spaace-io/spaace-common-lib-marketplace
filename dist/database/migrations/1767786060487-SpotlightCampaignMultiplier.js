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
exports.SpotlightCampaignMultiplier1767786060487 = void 0;
class SpotlightCampaignMultiplier1767786060487 {
    constructor() {
        this.name = 'SpotlightCampaignMultiplier1767786060487';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_runs"
      ADD COLUMN "multiplier" numeric(78,2) NOT NULL DEFAULT 2.0;
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_runs"
      DROP COLUMN "multiplier";
    `);
        });
    }
}
exports.SpotlightCampaignMultiplier1767786060487 = SpotlightCampaignMultiplier1767786060487;
//# sourceMappingURL=1767786060487-SpotlightCampaignMultiplier.js.map