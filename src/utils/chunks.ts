export function* splitChunks<T>(array: T[], chunkSize: number) {
  array = [...array];
  while (array.length) yield array.splice(0, chunkSize);
}
