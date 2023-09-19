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
exports.deployedAt1671286608892 = void 0;
class deployedAt1671286608892 {
    constructor() {
        this.name = 'deployedAt1671286608892';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "created_at" TO "deployedAt"`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "deployedAt" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "deployedAt" DROP DEFAULT`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "deployedAt" SET DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "deployedAt" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "deployedAt" TO "created_at"`);
        });
    }
}
exports.deployedAt1671286608892 = deployedAt1671286608892;
//# sourceMappingURL=1671286608892-deployedAt.js.map