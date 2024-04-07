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
exports.MemberStarsAddedInCrewProgress1712492704630 = void 0;
class MemberStarsAddedInCrewProgress1712492704630 {
    constructor() {
        this.name = 'MemberStarsAddedInCrewProgress1712492704630';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" ADD "memberStars" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" DROP COLUMN "memberStars"`);
        });
    }
}
exports.MemberStarsAddedInCrewProgress1712492704630 = MemberStarsAddedInCrewProgress1712492704630;
//# sourceMappingURL=1712492704630-memberStarsAddedInCrewProgress.js.map