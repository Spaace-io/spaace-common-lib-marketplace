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
exports.columnTypes1687691412016 = void 0;
class columnTypes1687691412016 {
    constructor() {
        this.name = 'columnTypes1687691412016';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "tokenId" TYPE numeric(78) USING "tokenId"::numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "signature" TYPE text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "signature" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "tokenId" TYPE character varying`);
        });
    }
}
exports.columnTypes1687691412016 = columnTypes1687691412016;
//# sourceMappingURL=1687691412016-columnTypes.js.map