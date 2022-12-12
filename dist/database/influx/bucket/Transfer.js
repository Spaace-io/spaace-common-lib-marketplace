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
exports.Transfer = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const __1 = require("..");
class Transfer {
    constructor(hash, from, to, collection, item, amount, timestamp) {
        this.hash = hash;
        this.from = from;
        this.to = to;
        this.collection = collection;
        this.item = item;
        this.amount = amount;
        this.timestamp = timestamp;
    }
    toPoint() {
        return new influxdb_client_1.Point(Transfer.MEASUREMENT_NAME)
            .stringField('hash', this.hash)
            .stringField('from', this.from)
            .stringField('to', this.to)
            .stringField('collection', this.collection)
            .stringField('item', this.item)
            .stringField('amount', this.amount)
            .timestamp(this.timestamp);
    }
    write(flush = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const writeApi = yield Transfer.getWriteApi();
            writeApi.writePoint(this.toPoint());
            if (flush)
                yield writeApi.flush();
        });
    }
    static getWriteApi() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.writeApi === undefined)
                this.writeApi = yield (0, __1.getWriteApi)(this.BUCKET_NAME);
            return this.writeApi;
        });
    }
}
exports.Transfer = Transfer;
Transfer.BUCKET_NAME = 'transfers';
Transfer.MEASUREMENT_NAME = 'transfer';
//# sourceMappingURL=Transfer.js.map