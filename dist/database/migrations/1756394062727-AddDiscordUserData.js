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
exports.AddDiscordUserData1756394062727 = void 0;
class AddDiscordUserData1756394062727 {
    constructor() {
        this.name = 'AddDiscordUserData1756394062727';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "discordId" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "discordUsername" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "discordAccessToken" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "discordRefreshToken" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discordRefreshToken"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discordAccessToken"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discordUsername"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discordId"`);
        });
    }
}
exports.AddDiscordUserData1756394062727 = AddDiscordUserData1756394062727;
//# sourceMappingURL=1756394062727-AddDiscordUserData.js.map