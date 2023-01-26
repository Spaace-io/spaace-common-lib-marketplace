export declare function splitChunks<T>(array: T[], chunkSize: number): Generator<T[], void, unknown>;
export declare function runChunks<T>(array: T[], chunkSize: number, job: (chunk: T[]) => Promise<void>): Promise<void>;
