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
exports.SpotlightCampaignRunExtension1767972855815 = void 0;
class SpotlightCampaignRunExtension1767972855815 {
    constructor() {
        this.name = 'SpotlightCampaignRunExtension1767972855815';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "spotlight_campaign_runs" ADD "seasonNumber" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "spotlight_campaign_runs" ADD "collectionAddress" character(40) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "spotlight_campaign_runs" DROP COLUMN "collectionAddress"`);
            yield queryRunner.query(`ALTER TABLE "spotlight_campaign_runs" DROP COLUMN "seasonNumber"`);
        });
    }
}
exports.SpotlightCampaignRunExtension1767972855815 = SpotlightCampaignRunExtension1767972855815;
//# sourceMappingURL=1767972855815-SpotlightCampaignRunExtension.js.map