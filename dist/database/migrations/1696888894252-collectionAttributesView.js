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
exports.CollectionAttributesView1696888894252 = void 0;
class CollectionAttributesView1696888894252 {
    constructor() {
        this.name = 'CollectionAttributesView1696888894252';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'item_attributes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "item_attributes_view"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_b1478d78161a2434a3beab664b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_1866bd8ac2446df677ded46be6"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_17d50389119c0c7b23d256658b8"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_b1478d78161a2434a3beab664b3" PRIMARY KEY ("tokenId", "traitHash", "collectionAddress")`);
            yield queryRunner.query(`CREATE INDEX "IDX_5a9502e3dd5540b99b8a927015" ON "item_attributes" ("collectionAddress", "tokenId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_1866bd8ac2446df677ded46be6" ON "item_attributes" ("collectionAddress", "traitHash", "valueHash") `);
            yield queryRunner.query(`CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(DISTINCT "attribute"."tokenId") AS "count" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collection_attributes_view',
                'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(DISTINCT "attribute"."tokenId") AS "count" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
            ]);
            yield queryRunner.query(`CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "item_attributes" "attribute"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'item_attributes_view',
                'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "item_attributes" "attribute"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'item_attributes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "item_attributes_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collection_attributes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collection_attributes_view"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_1866bd8ac2446df677ded46be6"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_5a9502e3dd5540b99b8a927015"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_b1478d78161a2434a3beab664b3"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_17d50389119c0c7b23d256658b8" PRIMARY KEY ("tokenId", "trait", "collectionAddress")`);
            yield queryRunner.query(`CREATE INDEX "IDX_1866bd8ac2446df677ded46be6" ON "item_attributes" ("collectionAddress", "traitHash", "valueHash") `);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_b1478d78161a2434a3beab664b" ON "item_attributes" ("collectionAddress", "tokenId", "traitHash") `);
            yield queryRunner.query(`CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."trait" AS "trait", "attribute"."value" AS "value" FROM "item_attributes" "attribute"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'item_attributes_view',
                'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."trait" AS "trait", "attribute"."value" AS "value" FROM "item_attributes" "attribute"',
            ]);
        });
    }
}
exports.CollectionAttributesView1696888894252 = CollectionAttributesView1696888894252;
//# sourceMappingURL=1696888894252-collectionAttributesView.js.map