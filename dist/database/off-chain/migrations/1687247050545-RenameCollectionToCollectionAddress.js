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
exports.RenameCollectionToCollectionAddress1687247050545 = void 0;
class RenameCollectionToCollectionAddress1687247050545 {
    constructor() {
        this.name = 'RenameCollectionToCollectionAddress1687247050545';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "collection" TO "collectionAddress"`);
            yield queryRunner.query(`ALTER TABLE "notable_collections" RENAME COLUMN "collection" TO "collectionAddress"`);
            yield queryRunner.query(`ALTER TABLE "notable_collections" RENAME CONSTRAINT "PK_5a76a7e64f51ddc26c6201ff047" TO "PK_b927dbd37a77ed934fcf53d185d"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "notable_collections" RENAME CONSTRAINT "PK_b927dbd37a77ed934fcf53d185d" TO "PK_5a76a7e64f51ddc26c6201ff047"`);
            yield queryRunner.query(`ALTER TABLE "notable_collections" RENAME COLUMN "collectionAddress" TO "collection"`);
            yield queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "collectionAddress" TO "collection"`);
        });
    }
}
exports.RenameCollectionToCollectionAddress1687247050545 = RenameCollectionToCollectionAddress1687247050545;
//# sourceMappingURL=1687247050545-RenameCollectionToCollectionAddress.js.map