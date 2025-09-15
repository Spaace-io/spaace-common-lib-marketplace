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
exports.AddLastProcceedField1756727333934 = void 0;
class AddLastProcceedField1756727333934 {
    constructor() {
        this.name = 'AddLastProcceedField1756727333934';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE user_quest_progress 
      ADD COLUMN "lastProcessedAt" TIMESTAMP NULL;
      `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE user_quest_progress 
      DROP COLUMN "lastProcessedAt";
      `);
        });
    }
}
exports.AddLastProcceedField1756727333934 = AddLastProcceedField1756727333934;
//# sourceMappingURL=1756727333934-last-procceed-field.js.map