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
exports.ArenaCronEntityAdded1709045017079 = void 0;
class ArenaCronEntityAdded1709045017079 {
    constructor() {
        this.name = 'ArenaCronEntityAdded1709045017079';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_crons" ("name" text NOT NULL, "lastProcessedTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_24a31d6a92279955be8832fe7ea" PRIMARY KEY ("name"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "arena_crons"`);
        });
    }
}
exports.ArenaCronEntityAdded1709045017079 = ArenaCronEntityAdded1709045017079;
//# sourceMappingURL=1709045017079-ArenaCronEntityAdded.js.map