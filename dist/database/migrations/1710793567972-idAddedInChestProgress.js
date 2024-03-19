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
exports.IdAddedInChestProgress1710793567972 = void 0;
class IdAddedInChestProgress1710793567972 {
    constructor() {
        this.name = 'IdAddedInChestProgress1710793567972';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" ADD "levelId" uuid NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "PK_5469c47bdedbfbb4f71bce6687c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "PK_860df0344b247b7043213c073ed" PRIMARY KEY ("userTwitter", "levelId")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_09df9f3e6607190933a11e78baf" FOREIGN KEY ("levelId") REFERENCES "arena_chest_probability_genesis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_09df9f3e6607190933a11e78baf"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "PK_860df0344b247b7043213c073ed"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "PK_5469c47bdedbfbb4f71bce6687c" PRIMARY KEY ("userTwitter")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" DROP COLUMN "levelId"`);
        });
    }
}
exports.IdAddedInChestProgress1710793567972 = IdAddedInChestProgress1710793567972;
//# sourceMappingURL=1710793567972-idAddedInChestProgress.js.map