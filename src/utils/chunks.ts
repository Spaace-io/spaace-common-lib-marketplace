export function* splitChunks<T>(array: T[], chunkSize: number) {
  array = [...array];
  while (array.length) yield array.splice(0, chunkSize);
}

export async function runChunks<T>(array: T[], chunkSize: number, job: (chunk: T[]) => Promise<void>) {
  for (var chunk of splitChunks(array, chunkSize)) await job(chunk);
}
