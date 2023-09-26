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
exports.ForeignKeys1695762484648 = void 0;
class ForeignKeys1695762484648 {
    constructor() {
        this.name = 'ForeignKeys1695762484648';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_737f403a0dc0349952989dff4b2" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "notable_collections" ADD CONSTRAINT "FK_b927dbd37a77ed934fcf53d185d" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "hidden_items" ADD CONSTRAINT "FK_a52786234de9b0d5b59e855049e" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_b4f631fbc35bf7c7efc352a11e4" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_c7bb9f86817eb5337f4ee3d0a2d" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_95975e653057a2427abc340630b" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_2e87b5bd4bf73a7a8c4aadf8147" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e41c99bbacddaba54b87818120b" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_3fbda6ed5d04c5f7309e0f1f4e6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_f5f789da993aa5276366a0a194d" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_790df43caeb355875eb032acfad" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_790df43caeb355875eb032acfad"`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_f5f789da993aa5276366a0a194d"`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_3fbda6ed5d04c5f7309e0f1f4e6"`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e41c99bbacddaba54b87818120b"`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_2e87b5bd4bf73a7a8c4aadf8147"`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_95975e653057a2427abc340630b"`);
            yield queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_c7bb9f86817eb5337f4ee3d0a2d"`);
            yield queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_b4f631fbc35bf7c7efc352a11e4"`);
            yield queryRunner.query(`ALTER TABLE "hidden_items" DROP CONSTRAINT "FK_a52786234de9b0d5b59e855049e"`);
            yield queryRunner.query(`ALTER TABLE "notable_collections" DROP CONSTRAINT "FK_b927dbd37a77ed934fcf53d185d"`);
            yield queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_737f403a0dc0349952989dff4b2"`);
        });
    }
}
exports.ForeignKeys1695762484648 = ForeignKeys1695762484648;
//# sourceMappingURL=1695762484648-foreignKeys.js.map