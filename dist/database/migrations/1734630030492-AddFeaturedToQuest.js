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
exports.AddFeaturedToQuest1734630030492 = void 0;
class AddFeaturedToQuest1734630030492 {
    constructor() {
        this.name = 'AddFeaturedToQuest1734630030492';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "quests"
      ADD COLUMN "featured" boolean DEFAULT false
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "quests"
      DROP COLUMN "featured"
    `);
        });
    }
}
exports.AddFeaturedToQuest1734630030492 = AddFeaturedToQuest1734630030492;
//# sourceMappingURL=1734630030492-AddFeaturedToQuest.js.map