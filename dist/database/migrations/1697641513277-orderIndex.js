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
exports.OrderIndex1697641513277 = void 0;
class OrderIndex1697641513277 {
    constructor() {
        this.name = 'OrderIndex1697641513277';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE INDEX "IDX_8b6c737c16b17e9b2b2868e9e9" ON "orders" ("collectionAddress", "startTime") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_8b6c737c16b17e9b2b2868e9e9"`);
        });
    }
}
exports.OrderIndex1697641513277 = OrderIndex1697641513277;
//# sourceMappingURL=1697641513277-orderIndex.js.map