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
exports.Index1694816310568 = void 0;
class Index1694816310568 {
    constructor() {
        this.name = 'Index1694816310568';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE INDEX "IDX_69f34fb128a167e9dd3eeada35" ON "transfers" ("to", "collectionAddress", "tokenId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_bf41fc975d409aa73fb34d2145" ON "transfers" ("from", "collectionAddress", "tokenId") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_bf41fc975d409aa73fb34d2145"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_69f34fb128a167e9dd3eeada35"`);
        });
    }
}
exports.Index1694816310568 = Index1694816310568;
//# sourceMappingURL=1694816310568-index.js.map