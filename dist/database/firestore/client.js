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
const firestore_1 = require("@google-cloud/firestore");
class FirestoreClient {
    constructor() {
        this.firestore = new firestore_1.Firestore({
            projectId: process.env.FIRESTORE_PROJECT_ID,
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Pre-fetch current season in cache
        });
    }
    getSeason(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const seasons = yield this.firestore
                .collection('seasons')
                .doc(number.toString())
                .get();
            if (!seasons.exists)
                return null;
            return seasons.data();
        });
    }
    getCurrentSeason(now) {
        return __awaiter(this, void 0, void 0, function* () {
            if (now === undefined)
                now = firestore_1.Timestamp.now();
            const snapshot = yield this.firestore
                .collection('seasons')
                .where('startDate', '<=', now)
                .where('endDate', '>', now)
                .orderBy(firestore_1.FieldPath.documentId(), 'desc')
                .limit(1)
                .get();
            if (snapshot.empty)
                return null;
            return snapshot.docs[0].data();
        });
    }
}
exports.default = new FirestoreClient();
//# sourceMappingURL=client.js.map