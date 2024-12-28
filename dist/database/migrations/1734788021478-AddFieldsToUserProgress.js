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
exports.AddFieldsToUserProgress1734788021478 = void 0;
class AddFieldsToUserProgress1734788021478 {
    constructor() {
        this.name = 'AddFieldsToUserProgress1734788021478';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "boostMultiplier" numeric(78, 2) DEFAULT '1.0',
      ADD COLUMN "points" numeric(78) DEFAULT '0'
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "points",
      DROP COLUMN "boostMultiplier"
    `);
        });
    }
}
exports.AddFieldsToUserProgress1734788021478 = AddFieldsToUserProgress1734788021478;
//# sourceMappingURL=1734788021478-AddFieldsToUserProgress.js.map