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
exports.Block = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const __1 = require("..");
class Block {
    constructor(number) {
        this.number = number;
    }
    toPoint() {
        return new influxdb_client_1.Point(Block.MEASUREMENT_NAME)
            .uintField('number', this.number);
    }
    write(flush = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const writeApi = yield Block.getWriteApi();
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
exports.Block = Block;
Block.BUCKET_NAME = 'blocks';
Block.MEASUREMENT_NAME = 'block';
//# sourceMappingURL=Block.js.map