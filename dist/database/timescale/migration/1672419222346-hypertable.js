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
exports.hypertable1672419222346 = void 0;
class hypertable1672419222346 {
    constructor() {
        this.name = 'hypertable1672419222346';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "PK_8014320111bae3fc011967a73de"`);
            yield queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "PK_391afc4e8fd540698f989c14d2b" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "item", "timestamp")`);
            yield queryRunner.query(`SELECT create_hypertable('transfers', 'timestamp');`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "PK_391afc4e8fd540698f989c14d2b"`);
            yield queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "PK_8014320111bae3fc011967a73de" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "item")`);
        });
    }
}
exports.hypertable1672419222346 = hypertable1672419222346;
//# sourceMappingURL=1672419222346-hypertable.js.map