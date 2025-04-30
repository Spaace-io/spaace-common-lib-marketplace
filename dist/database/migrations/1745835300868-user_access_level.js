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
exports.UserAccessLevel1745835300868 = void 0;
class UserAccessLevel1745835300868 {
    constructor() {
        this.name = 'UserAccessLevel1745835300868';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."access_level" AS ENUM('LOCKED', 'INVITED', 'WHITELISTED')`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "accessLevel" "public"."access_level" NOT NULL DEFAULT 'LOCKED'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accessLevel"`);
            yield queryRunner.query(`DROP TYPE "public"."access_level"`);
        });
    }
}
exports.UserAccessLevel1745835300868 = UserAccessLevel1745835300868;
//# sourceMappingURL=1745835300868-user_access_level.js.map