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
exports.AddBoostMultiplierToUserLoyalty1734629314225 = void 0;
class AddBoostMultiplierToUserLoyalty1734629314225 {
    constructor() {
        this.name = 'AddBoostMultiplierToUserLoyalty1734629314225';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "user_loyalties"
      ADD COLUMN "boostMultiplier" numeric(78, 2) DEFAULT '1.0'
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "user_loyalties"
      DROP COLUMN "boostMultiplier"
    `);
        });
    }
}
exports.AddBoostMultiplierToUserLoyalty1734629314225 = AddBoostMultiplierToUserLoyalty1734629314225;
//# sourceMappingURL=1734629314225-AddBoostMultiplierToUserLoyalty.js.map