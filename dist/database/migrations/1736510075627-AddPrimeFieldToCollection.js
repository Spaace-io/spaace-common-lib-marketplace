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
exports.AddPrimeFieldToCollection1736510075627 = void 0;
class AddPrimeFieldToCollection1736510075627 {
    constructor() {
        this.name = 'AddPrimeFieldToCollection1736510075627';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "collections"
      ADD COLUMN "prime" boolean DEFAULT false
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "collections"
      DROP COLUMN "prime"
    `);
        });
    }
}
exports.AddPrimeFieldToCollection1736510075627 = AddPrimeFieldToCollection1736510075627;
//# sourceMappingURL=1736510075627-AddPrimeFieldToCollection.js.map