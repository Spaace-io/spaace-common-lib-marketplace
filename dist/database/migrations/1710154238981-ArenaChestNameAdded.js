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
exports.ArenaChestNameAdded1710154238981 = void 0;
class ArenaChestNameAdded1710154238981 {
    constructor() {
        this.name = 'ArenaChestNameAdded1710154238981';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" DROP CONSTRAINT "PK_1fc27ffcf9493669230428fb573"`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" DROP COLUMN "name"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_chest_name" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS')`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ADD "name" "public"."arena_chest_name" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ADD CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" DROP CONSTRAINT "PK_1fc27ffcf9493669230428fb573"`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" DROP COLUMN "name"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_chest_name"`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ADD "name" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ADD CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name")`);
        });
    }
}
exports.ArenaChestNameAdded1710154238981 = ArenaChestNameAdded1710154238981;
//# sourceMappingURL=1710154238981-ArenaChestNameAdded.js.map