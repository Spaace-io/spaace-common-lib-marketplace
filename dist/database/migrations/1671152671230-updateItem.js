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
exports.updateItem1671152671230 = void 0;
class updateItem1671152671230 {
    constructor() {
        this.name = 'updateItem1671152671230';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4ac36bcb5af17969055999c84e3"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_61b73312456c4f25a9f4102ea45" PRIMARY KEY ("tokenId")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "isRefreshed"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "lastTimeUpdate"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "collectionId"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "primaryId"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "deployedOwner"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "countOwner"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "totalSupply"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "highOffer"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "collection" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_61b73312456c4f25a9f4102ea45"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" PRIMARY KEY ("tokenId", "collection")`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "address" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a" PRIMARY KEY ("address")`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "deployer" character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "deployer"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_6a20f6af50eaccf584e5e2a9a6a"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "address"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_6e28cea27b3667af77a587ef45b"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_61b73312456c4f25a9f4102ea45" PRIMARY KEY ("tokenId")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "collection"`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "highOffer" character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "totalSupply" integer`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "countOwner" character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "deployedOwner" character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "id" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "primaryId" character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a" UNIQUE ("primaryId")`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "collectionId" character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "updated_at" TIMESTAMP DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "created_at" TIMESTAMP DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "lastTimeUpdate" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "isRefreshed" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_61b73312456c4f25a9f4102ea45"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4ac36bcb5af17969055999c84e3" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.updateItem1671152671230 = updateItem1671152671230;
//# sourceMappingURL=1671152671230-updateItem.js.map