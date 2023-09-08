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
exports.Report1694172034329 = void 0;
class Report1694172034329 {
    constructor() {
        this.name = 'Report1694172034329';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "reports" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_66592117509d55235181645b336" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "reports"`);
        });
    }
}
exports.Report1694172034329 = Report1694172034329;
//# sourceMappingURL=1694172034329-report.js.map