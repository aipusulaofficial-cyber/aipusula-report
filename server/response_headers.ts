export function setLatencyHeader(res: { setHeader: (name: string, value: string) => void }, startedAt: number): void {
  res.setHeader("x-latency-ms", String(Math.max(0, Date.now() - startedAt)));
}
