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
const types_1 = require("./types");
dotenv.config();
class FirestoreClient {
    constructor() {
        this.store = new firestore_1.Firestore({
            projectId: process.env.FIRESTORE_PROJECT_ID,
        });
        this.seasons = this.store.collection('seasons');
        this.quests = this.store.collection('quests');
    }
    /**
     * Initialize the Firestore client
     * Create initial season and quests if not exists
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createInitialSeason();
            console.log('Firestore client initialized.');
        });
    }
    /**
     * Create initial season and quests if not exists
     */
    createInitialSeason() {
        return __awaiter(this, void 0, void 0, function* () {
            const firstSeason = yield this.getSeasonByNumber(1);
            if (firstSeason === null) {
                console.log('Creating initial season...');
                const season = yield this.store.collection('seasons').add({
                    name: 'Welcome to Spaace',
                    number: 1,
                    startDate: new Date(),
                });
                yield this.createInitialQuests(season);
            }
            else {
                console.log('Initial season already exists, skipping...');
            }
        });
    }
    /**
     * Create initial quests
     * @param season Season reference
     */
    createInitialQuests(season) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(grinds_1.firstSeasonDailyQuests.map((data) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const quests = yield season.collection('quests').add({
                    //name: grind.name,
                    daily: (_a = data.daily) !== null && _a !== void 0 ? _a : false,
                    infinite: (_b = data.infinite) !== null && _b !== void 0 ? _b : false,
                    // maxCall: data.maxCall,
                });
                yield Promise.all([
                    ...((_d = (_c = data.rewards) === null || _c === void 0 ? void 0 : _c.map((reward) => __awaiter(this, void 0, void 0, function* () {
                        yield quests.collection('rewards').add({
                            questPoints: reward.questPoints,
                        });
                    }))) !== null && _d !== void 0 ? _d : []),
                    ...((_f = (_e = data.initRules) === null || _e === void 0 ? void 0 : _e.map((rule) => __awaiter(this, void 0, void 0, function* () {
                        yield quests.collection('initRules').add({
                            property: rule.property,
                            operator: rule.operator,
                            value: rule.value,
                        });
                    }))) !== null && _f !== void 0 ? _f : []),
                    ...((_h = (_g = data.rules) === null || _g === void 0 ? void 0 : _g.map((rule) => __awaiter(this, void 0, void 0, function* () {
                        yield quests.collection('rules').add({
                            property: rule.property,
                            operator: rule.operator,
                            value: rule.value,
                        });
                    }))) !== null && _h !== void 0 ? _h : []),
                ]);
            })));
        });
    }
    /**
     * Get season by season number
     * @param number Season number
     * @returns Season or null if not found
     */
    getSeasonByNumber(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const seasons = yield this.store
                .collection('seasons')
                .where('number', '==', number)
                .limit(1)
                .get();
            if (seasons.docs.length === 0) {
                return null;
            }
            return seasons.docs[0].data();
        });
    }
    /**
     * Retrieve current season
     * @returns Current season or null if not found
     */
    getCurrentSeason() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.seasons
                .where('startDate', '<=', new Date())
                .orderBy('startDate', 'desc')
                .limit(1)
                .get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return {};
            }
            const season = snapshot.docs[0].data();
            const quests = yield snapshot.docs[0].ref.collection('quests').get();
            season.quests = yield Promise.all(quests.docs.map((doc) => __awaiter(this, void 0, void 0, function* () {
                const quest = doc.data();
                const [initRules, rules, rewards] = yield Promise.all([
                    doc.ref.collection('initRules').get(),
                    doc.ref.collection('rules').get(),
                    doc.ref.collection('rewards').get(),
                ]);
                return Object.assign(Object.assign({}, quest), { initRules: initRules.docs.map((doc) => doc.data()), rules: rules.docs.map((doc) => doc.data()), rewards: rewards.docs.map((doc) => doc.data()) });
            })));
            return season;
        });
    }
    /**
     * Get user by address
     * @param address The user address
     * @returns User or null if not found
     */
    getUser(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.store.collection('users').doc(address).get();
            if (!user.exists) {
                return null;
            }
            return user.data();
        });
    }
    /**
     * Create user if not exists
     * @param address The user address
     * @returns User that was created
     */
    createUser(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store
                .collection('users')
                .doc(address)
                .set(Object.assign({ address }, types_1.defaultUser));
            yield Promise.all([
                yield this.store
                    .collection('users')
                    .doc(address)
                    .collection('counters')
                    .add(types_1.defaultCounters),
                yield this.store
                    .collection('users')
                    .doc(address)
                    .collection('quests')
                    .add({}),
            ]);
            return (yield this.getUser(address));
        });
    }
}
exports.default = new FirestoreClient();
//# sourceMappingURL=client.js.map