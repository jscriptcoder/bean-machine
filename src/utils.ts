export function initArray<T>(size: number, initItem: () => T): T[] {
  // just one way to do python `range()` in js
  return [...Array(size).keys()].map(_ => initItem())
}

export function getRange(size: number): number[] {
  return [...Array(size).keys()].map(i => i)
}
