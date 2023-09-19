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
exports.volumes1674476945779 = void 0;
class volumes1674476945779 {
    constructor() {
        this.name = 'volumes1674476945779';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volume24h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volumeChange24h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volume7d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volumeChange7d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volume30d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volumeChange30d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volume" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "floorPrice" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "floorChange24h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "floorChange7d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "floorChange30d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a"`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "address" TYPE character(40)`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address")`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "deployer" TYPE character(40)`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_6e28cea27b3667af77a587ef45b"`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "collection" TYPE character(40)`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" PRIMARY KEY ("tokenId", "collection")`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_6e28cea27b3667af77a587ef45b"`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "collection" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" PRIMARY KEY ("tokenId", "collection")`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "deployer" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a"`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "address" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address")`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "floorChange30d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "floorChange7d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "floorChange24h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "floorPrice"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volumeChange30d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume30d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volumeChange7d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume7d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volumeChange24h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume24h"`);
        });
    }
}
exports.volumes1674476945779 = volumes1674476945779;
//# sourceMappingURL=1674476945779-volumes.js.map