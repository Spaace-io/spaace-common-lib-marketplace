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
exports.fixTransferPK1670960552946 = void 0;
class fixTransferPK1670960552946 {
    constructor() {
        this.name = 'fixTransferPK1670960552946';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "PK_dbae301f250e9d4435104066841"`);
            yield queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "PK_8014320111bae3fc011967a73de" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "item")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "PK_8014320111bae3fc011967a73de"`);
            yield queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "PK_dbae301f250e9d4435104066841" PRIMARY KEY ("txHash", "logIdx")`);
        });
    }
}
exports.fixTransferPK1670960552946 = fixTransferPK1670960552946;
//# sourceMappingURL=1670960552946-fixTransferPK.js.map