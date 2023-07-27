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
exports.txHash1690470462891 = void 0;
class txHash1690470462891 {
    constructor() {
        this.name = 'txHash1690470462891';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "txHash" character(64) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "logIdx" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP CONSTRAINT "PK_41126261e9a22d2405c6ebde644"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD CONSTRAINT "PK_a9faf6c57ab8c33732fb50dfa2c" PRIMARY KEY ("txHash", "logIdx")`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "cancelTxHash" character(64) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "cancelLogIdx" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "cancelTimestamp" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "logIdx" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "logIdx" TYPE numeric(78)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "logIdx" TYPE integer`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "logIdx" TYPE integer`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cancelTimestamp"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cancelLogIdx"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cancelTxHash"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD CONSTRAINT "PK_0e702ca6f5217d2bad5e0db3371" PRIMARY KEY ("userAddress", "timestamp", "txHash")`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD CONSTRAINT "PK_41126261e9a22d2405c6ebde644" PRIMARY KEY ("userAddress", "timestamp")`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "logIdx"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "txHash"`);
        });
    }
}
exports.txHash1690470462891 = txHash1690470462891;
//# sourceMappingURL=1690470462891-txHash.js.map