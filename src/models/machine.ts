import Bucket from './bucket'
import Ball from './ball'
import { initArray, getRange } from '../utils'


type Dir = 'L' | 'R'
type Path = Dir[]

export default class Machine {
  buckets: Bucket[]
  bouncingRows: number
  totalBalls: number

  constructor(numBuckets: number = 2) {
    this.buckets = initArray(numBuckets, () => new Bucket())
    this.bouncingRows = this.buckets.length - 1
    this.totalBalls = 0
  }

  dropInBucket(ball: Ball, path: Path) {
    // Will drop the ball in the right bucket depending
    // on the path taken
    const bucketIdx = path.reduce((acc, dir) => {
      acc += dir === 'L' ? 0 : 1
      return acc
    }, 0)

    this.buckets[bucketIdx].balls.push(ball)
  }

  async dropSingleBall(ball: Ball): Promise<void> {
    const pathTaken: Path = []

    await Promise.all(getRange(this.bouncingRows).map(async _ => {
      // Pseudo-random number in the range 0 to less than 1
      // (inclusive of 0, but not 1) with approximately uniform
      // distribution over that range
      const rnd = Math.random()
      pathTaken.push(ball.pLeft < rnd ? 'L' : 'R')
      // We might want to add delay here between bounces
      // await sleep()
    }))

    this.dropInBucket(ball, pathTaken)
  }

  async dropAllBalls(balls: Ball[]): Promise<void> {
    this.totalBalls = balls.length

    // We start dropping balls one by one...
    // We make the whole process asynchronous since
    // it might take some time for the all the ball to finish,
    // plus time between balls. Even though all this is
    // fictitious, we could definitely add those delays.
    await Promise.all(balls.map(async ball => {
      const done = this.dropSingleBall(ball)
      // We might want to add delay here between balls
      // await sleep()
      return done
    }))
  }
}
