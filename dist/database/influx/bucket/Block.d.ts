import { Point, WriteApi } from '@influxdata/influxdb-client';
export declare class Block {
    static readonly BUCKET_NAME = "blocks";
    static readonly MEASUREMENT_NAME = "block";
    private static writeApi?;
    readonly number: number;
    constructor(number: number);
    toPoint(): Point;
    write(flush?: boolean): Promise<void>;
    static getWriteApi(): Promise<WriteApi>;
}
