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
exports.AddNftScoreField1758290154609 = void 0;
class AddNftScoreField1758290154609 {
    constructor() {
        this.name = 'AddNftScoreField1758290154609';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD "nftScore" integer NOT NULL DEFAULT 0`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "nftScore"`);
        });
    }
}
exports.AddNftScoreField1758290154609 = AddNftScoreField1758290154609;
//# sourceMappingURL=1758290154609-add-nft-score-field.js.map