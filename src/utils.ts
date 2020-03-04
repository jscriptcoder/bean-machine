import EventEmitter from 'events'

export function initArray<T>(size: number, initItem: () => T): T[] {
  return [...Array(size).keys()].map(_ => initItem())
}

export function getRange(size: number): number[] {
  // just one way to do python `range()` in js
  return [...Array(size).keys()].map(i => i)
}

// We're gonna use this emitter as our event bus
export const emitter = new EventEmitter()
