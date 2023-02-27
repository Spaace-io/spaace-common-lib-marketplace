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
const client_1 = require("./client");
const types_1 = require("./types");
/* This is a test code only, for retrieving a doc during development phase
   Use the following command to run this code:
   npm run dev:firestore
*/
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const newSeason = yield client_1.default.collection('seasons').add({
        name: 'Welcome to Spaace',
        number: 1,
        startDate: new Date(),
        grinds: [
            {
                rule: {
                    property: types_1.RuleProperty.LISTED,
                    operator: types_1.RuleOperator.GTE,
                    value: 1,
                },
                rewards: [
                    {
                        stakingBonus: 0.1,
                    },
                ],
            },
        ],
    });
    const doc = (yield client_1.default.collection('seasons').doc(newSeason.id).get()).data();
    return doc;
});
main().then((data) => console.log(data));
//# sourceMappingURL=init.js.map