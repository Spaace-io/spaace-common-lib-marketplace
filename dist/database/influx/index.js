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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWriteApi = exports.InfluxQueryApi = exports.getOrgID = exports.InfluxDatabase = void 0;
var influxdb_client_1 = require("@influxdata/influxdb-client");
var influxdb_client_apis_1 = require("@influxdata/influxdb-client-apis");
var url = process.env.INFLUXDB_URL;
var token = process.env.INFLUXDB_TOKEN;
var org = (_a = process.env.INFLUXDB_ORG) !== null && _a !== void 0 ? _a : '';
exports.InfluxDatabase = new influxdb_client_1.InfluxDB({
    url: url,
    token: token,
});
var orgID = undefined;
function getOrgID() {
    return __awaiter(this, void 0, void 0, function () {
        var orgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(orgID === undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, new influxdb_client_apis_1.OrgsAPI(exports.InfluxDatabase).getOrgs({
                            org: org
                        })];
                case 1:
                    orgs = (_a.sent()).orgs;
                    if (orgs === undefined || orgs.length !== 1 || orgs[0].id == undefined)
                        throw new Error("No organization named \"".concat(org, "\" found!"));
                    orgID = orgs[0].id;
                    _a.label = 2;
                case 2: return [2 /*return*/, orgID];
            }
        });
    });
}
exports.getOrgID = getOrgID;
exports.InfluxQueryApi = exports.InfluxDatabase.getQueryApi(org);
function getWriteApi(bucket) {
    return __awaiter(this, void 0, void 0, function () {
        var bucketsAPI, _a, _b, e_1;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    bucketsAPI = new influxdb_client_apis_1.BucketsAPI(exports.InfluxDatabase);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    _b = (_a = bucketsAPI).postBuckets;
                    _c = {};
                    _d = {
                        name: bucket
                    };
                    return [4 /*yield*/, getOrgID()];
                case 2: return [4 /*yield*/, _b.apply(_a, [(_c.body = (_d.orgID = _e.sent(),
                            _d),
                            _c)])];
                case 3:
                    _e.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _e.sent();
                    if (!(e_1 instanceof influxdb_client_1.HttpError) || e_1.statusCode !== 422 || e_1.json.code !== 'conflict')
                        throw e_1;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, exports.InfluxDatabase.getWriteApi(org, bucket, 's')];
            }
        });
    });
}
exports.getWriteApi = getWriteApi;
__exportStar(require("./bucket"), exports);
//# sourceMappingURL=index.js.map