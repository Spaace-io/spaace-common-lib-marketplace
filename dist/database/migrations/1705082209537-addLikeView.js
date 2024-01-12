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
exports.AddLikeView1705082209537 = void 0;
class AddLikeView1705082209537 {
    constructor() {
        this.name = 'AddLikeView1705082209537';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE VIEW "likes_view" AS SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "likes" "like"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'likes_view',
                'SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "likes" "like"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'likes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "likes_view"`);
        });
    }
}
exports.AddLikeView1705082209537 = AddLikeView1705082209537;
//# sourceMappingURL=1705082209537-addLikeView.js.map