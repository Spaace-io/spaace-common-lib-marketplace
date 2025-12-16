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
exports.SpotlightCampaign1765880636001 = void 0;
class SpotlightCampaign1765880636001 {
    constructor() {
        this.name = 'SpotlightCampaign1765880636001';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "spotlight_campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "collectionAddress" character(40) NOT NULL, "collectionName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "validFrom" TIMESTAMP NOT NULL, "validTo" TIMESTAMP NOT NULL, "active" boolean NOT NULL DEFAULT true, "metadata" jsonb NOT NULL DEFAULT '[]'::jsonb, CONSTRAINT "PK_4960c8d6ac239bf96e89bfb49e1" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "spotlight_campaigns" ADD CONSTRAINT "FK_ff784e2e128c7108ff3b7f8cd8f" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "spotlight_campaigns" DROP CONSTRAINT "FK_ff784e2e128c7108ff3b7f8cd8f"`);
            yield queryRunner.query(`DROP TABLE "spotlight_campaigns"`);
        });
    }
}
exports.SpotlightCampaign1765880636001 = SpotlightCampaign1765880636001;
//# sourceMappingURL=1765880636001-SpotlightCampaign.js.map