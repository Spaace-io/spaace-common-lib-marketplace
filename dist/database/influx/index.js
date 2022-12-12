"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWriteApi = exports.InfluxQueryApi = exports.getOrgID = exports.InfluxDatabase = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const influxdb_client_apis_1 = require("@influxdata/influxdb-client-apis");
require("../../config");
const url = (_a = process.env.INFLUXDB_URL) !== null && _a !== void 0 ? _a : 'http://influx-db:8086';
const token = process.env.INFLUXDB_TOKEN;
const org = (_b = process.env.INFLUXDB_ORG) !== null && _b !== void 0 ? _b : '';
exports.InfluxDatabase = new influxdb_client_1.InfluxDB({
    url,
    token,
});
let orgID = undefined;
function getOrgID() {
    return __awaiter(this, void 0, void 0, function* () {
        if (orgID === undefined) {
            const { orgs } = yield new influxdb_client_apis_1.OrgsAPI(exports.InfluxDatabase).getOrgs({
                org
            });
            if (orgs === undefined || orgs.length !== 1 || orgs[0].id == undefined)
                throw new Error(`No organization named "${org}" found!`);
            orgID = orgs[0].id;
        }
        return orgID;
    });
}
exports.getOrgID = getOrgID;
exports.InfluxQueryApi = exports.InfluxDatabase.getQueryApi(org);
function getWriteApi(bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucketsAPI = new influxdb_client_apis_1.BucketsAPI(exports.InfluxDatabase);
        try {
            yield bucketsAPI.postBuckets({
                body: {
                    name: bucket,
                    orgID: yield getOrgID(),
                },
            });
        }
        catch (e) {
            if (!(e instanceof influxdb_client_1.HttpError) || e.statusCode !== 422 || e.json.code !== 'conflict')
                throw e;
        }
        return exports.InfluxDatabase.getWriteApi(org, bucket, 's');
    });
}
exports.getWriteApi = getWriteApi;
__exportStar(require("./bucket"), exports);
//# sourceMappingURL=index.js.map