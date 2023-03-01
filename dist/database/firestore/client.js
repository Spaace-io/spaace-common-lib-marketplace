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
const dotenv = require("dotenv");
const grinds_1 = require("./grinds");
dotenv.config();
class FirestoreClient {
    constructor() {
        this.store = new firestore_1.Firestore({
            projectId: process.env.FIRESTORE_PROJECT_ID,
        });
    }
    createInitialSeason() {
        return __awaiter(this, void 0, void 0, function* () {
            const firstSeason = yield this.getSeasonByNumber(1);
            if (firstSeason === null) {
                console.log('Creating initial season...');
                yield this.store.collection('seasons').add({
                    name: 'Welcome to Spaace',
                    number: 1,
                    startDate: new Date(),
                    grinds: [...grinds_1.firstSeasonDailyGrinds],
                });
            }
            else {
                console.log('Initial season already exists, skipping...');
            }
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createInitialSeason();
        });
    }
    getSeasonByNumber(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const seasons = yield this.store
                .collection('seasons')
                .where('number', '==', number)
                .get();
            if (seasons.docs.length === 0) {
                return null;
            }
            return seasons.docs[0].data();
        });
    }
}
exports.default = new FirestoreClient();
//# sourceMappingURL=client.js.map