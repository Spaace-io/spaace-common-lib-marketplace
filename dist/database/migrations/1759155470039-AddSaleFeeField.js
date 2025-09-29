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
exports.AddSaleFeeField1759155470039 = void 0;
class AddSaleFeeField1759155470039 {
    constructor() {
        this.name = 'AddSaleFeeField1759155470039';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" ADD "feeBreakdown" jsonb NOT NULL DEFAULT '[]'::jsonb`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "feeBreakdown"`);
        });
    }
}
exports.AddSaleFeeField1759155470039 = AddSaleFeeField1759155470039;
//# sourceMappingURL=1759155470039-AddSaleFeeField.js.map