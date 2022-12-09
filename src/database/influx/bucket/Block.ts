import { Point, WriteApi } from '@influxdata/influxdb-client';
import { getWriteApi } from '..';

export class Block {
    public static readonly BUCKET_NAME = 'blocks';
    public static readonly MEASUREMENT_NAME = 'block';

    private static writeApi?: WriteApi;

    public readonly number: number;

    constructor(number: number) {
        this.number = number;
    }

    public toPoint() {
        return new Point(Block.MEASUREMENT_NAME)
            .uintField('number', this.number);
    }

    public async write(flush: boolean = true) {
        const writeApi = await Block.getWriteApi();

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
