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
exports.admin1690539881606 = void 0;
class admin1690539881606 {
    constructor() {
        this.name = 'admin1690539881606';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seasons" RENAME COLUMN "startDate" TO "startTime"`);
            yield queryRunner.query(`ALTER TABLE "seasons" RENAME COLUMN "endDate" TO "endTime"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
            yield queryRunner.query(`ALTER TABLE "seasons" RENAME COLUMN "endTime" TO "endDate"`);
            yield queryRunner.query(`ALTER TABLE "seasons" RENAME COLUMN "startTime" TO "startDate"`);
        });
    }
}
exports.admin1690539881606 = admin1690539881606;
//# sourceMappingURL=1690539881606-admin.js.map