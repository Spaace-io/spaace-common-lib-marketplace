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
exports.saleAddressLength1673562362615 = void 0;
class saleAddressLength1673562362615 {
    constructor() {
        this.name = 'saleAddressLength1673562362615';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "collection" TYPE character(40)`);
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "currency" TYPE character(40)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "collection" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "currency" TYPE character varying`);
        });
    }
}
exports.saleAddressLength1673562362615 = saleAddressLength1673562362615;
//# sourceMappingURL=1673562362615-saleAddressLength.js.map