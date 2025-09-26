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
exports.AddUserReferralStatus1758867023713 = void 0;
class AddUserReferralStatus1758867023713 {
    constructor() {
        this.name = 'AddUserReferralStatus1758867023713';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "referralStatus" character varying(32)`);
            yield queryRunner.query(`
     UPDATE "users"
      SET "referralStatus" = CASE
      WHEN "referrerAddress" IS NOT NULL THEN 'pending'
      ELSE NULL
      END
      WHERE "referralStatus" IS NULL;
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referralStatus"`);
        });
    }
}
exports.AddUserReferralStatus1758867023713 = AddUserReferralStatus1758867023713;
//# sourceMappingURL=1758867023713-AddUserReferralStatus.js.map