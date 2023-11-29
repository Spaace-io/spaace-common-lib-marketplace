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
exports.CollectionLike1701258253453 = void 0;
class CollectionLike1701258253453 {
    constructor() {
        this.name = 'CollectionLike1701258253453';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e41c99bbacddaba54b87818120b"`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_790df43caeb355875eb032acfad"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_790df43caeb355875eb032acfad" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e41c99bbacddaba54b87818120b" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.CollectionLike1701258253453 = CollectionLike1701258253453;
//# sourceMappingURL=1701258253453-collectionLike.js.map