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
exports.importItems1673553798774 = void 0;
class importItems1673553798774 {
    constructor() {
        this.name = 'importItems1673553798774';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ADD "importItems" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "lastImport" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "lastImport" TIMESTAMP`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "lastImport"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "lastImport"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "importItems"`);
        });
    }
}
exports.importItems1673553798774 = importItems1673553798774;
//# sourceMappingURL=1673553798774-importItems.js.map