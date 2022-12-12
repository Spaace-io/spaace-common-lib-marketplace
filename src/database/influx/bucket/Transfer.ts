import { Point, WriteApi } from '@influxdata/influxdb-client';
import { getWriteApi } from '..';

export class Transfer {
    public static readonly BUCKET_NAME = 'transfers';
    public static readonly MEASUREMENT_NAME = 'transfer';

    private static writeApi?: WriteApi;

    public readonly hash: string;
    public readonly from: string;
    public readonly to: string;
    public readonly collection: string;
    public readonly item: string;
    public readonly amount: string;
    public readonly timestamp: number;

    constructor(hash: string, from: string, to: string, collection: string, item: string, amount: string, timestamp: number) {
        this.hash = hash;
        this.from = from;
        this.to = to;
        this.collection = collection;
        this.item = item;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public toPoint() {
        return new Point(Transfer.MEASUREMENT_NAME)
            .stringField('hash', this.hash)
            .stringField('from', this.from)
            .stringField('to', this.to)
            .stringField('collection', this.collection)
            .stringField('item', this.item)
            .stringField('amount', this.amount)
            .timestamp(this.timestamp);
    }

    public async write(flush: boolean = true) {
        const writeApi = await Transfer.getWriteApi();

        writeApi.writePoint(this.toPoint());

        if (flush)
            await writeApi.flush();
    }

    public static async getWriteApi() {
        if (this.writeApi === undefined)
            this.writeApi = await getWriteApi(this.BUCKET_NAME);

        return this.writeApi;
    }
}
