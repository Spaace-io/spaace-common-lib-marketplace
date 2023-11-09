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
exports.LastRefresh1699531535483 = void 0;
class LastRefresh1699531535483 {
    constructor() {
        this.name = 'LastRefresh1699531535483';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_3d0844cdd46863d617cbba6297"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ("pk" = TRUE)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_3d0844cdd46863d617cbba6297" CHECK (pk)`);
        });
    }
}
exports.LastRefresh1699531535483 = LastRefresh1699531535483;
//# sourceMappingURL=1699531535483-lastRefresh.js.map