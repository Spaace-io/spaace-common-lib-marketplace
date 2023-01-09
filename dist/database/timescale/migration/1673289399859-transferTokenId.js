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
exports.transferTokenId1673289399859 = void 0;
class transferTokenId1673289399859 {
    constructor() {
        this.name = 'transferTokenId1673289399859';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" RENAME COLUMN "item" TO "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "transfers" RENAME CONSTRAINT "PK_391afc4e8fd540698f989c14d2b" TO "PK_1c74abed84080dd3c483724aa78"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" RENAME CONSTRAINT "PK_1c74abed84080dd3c483724aa78" TO "PK_391afc4e8fd540698f989c14d2b"`);
            yield queryRunner.query(`ALTER TABLE "transfers" RENAME COLUMN "tokenId" TO "item"`);
        });
    }
}
exports.transferTokenId1673289399859 = transferTokenId1673289399859;
//# sourceMappingURL=1673289399859-transferTokenId.js.map