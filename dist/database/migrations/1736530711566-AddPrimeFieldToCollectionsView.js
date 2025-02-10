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
exports.AddPrimeFieldToCollectionsView1736530711566 = void 0;
class AddPrimeFieldToCollectionsView1736530711566 {
    constructor() {
        this.name = 'AddPrimeFieldToCollectionsView1736530711566';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP VIEW IF EXISTS "collections_view"`);
            yield queryRunner.query(`CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."prime" AS "prime", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable", (SELECT MAX("item"."rarityRanking") as "maxRarityRanking" FROM "items" "item" WHERE "item"."collectionAddress" = "collection"."address") AS "maxRarityRanking" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP VIEW "collections_view"`);
        });
    }
}
exports.AddPrimeFieldToCollectionsView1736530711566 = AddPrimeFieldToCollectionsView1736530711566;
//# sourceMappingURL=1736530711566-AddPrimeFieldToCollectionsView.js.map