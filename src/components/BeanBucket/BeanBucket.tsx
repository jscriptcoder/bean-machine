import React from 'react'

import './BeanBucket.css'
import Bucket from '../../models/bucket'
import Ball from '../../models/ball'

interface BeanBucketProps {
  model: Bucket
  capacity: number
  onEmpty: (balls: Ball[]) => void
}

interface BeanBucketState {
  bucket: Bucket
  opened: boolean
}

export default class BeanBucket
  extends React.Component<BeanBucketProps, BeanBucketState> {

  constructor(props: BeanBucketProps) {
    super(props)

    this.state = {
      bucket: props.model,
      opened: false
    }
  }

  onClick = () => {
    const { onEmpty } = this.props
    const { bucket, opened } = this.state
    const numBalls = bucket.balls.length

    if (!opened && numBalls > 0) {
      // Copy content. We're gonna drop these guys
      // in another machine
      const balls = bucket.balls.slice(0)

      // ... emptying this bucket
      bucket.balls.length = 0

      this.setState({ bucket, opened: true })

      onEmpty(balls)
    }
  }

  render() {
    const { capacity } = this.props
    const { bucket, opened } = this.state
    const height = bucket.balls.length * 100 / capacity

    return (
      <div
        className="BeanBucket"
        style={{ borderBottom: opened ? 0 : 'auto' }}
        onClick={this.onClick}>

        <div className="BeanBucket__balls">
          {bucket.balls.length}
        </div>

        <div
          className="BeanBucket__bar"
          style={{ height: `${height}%` }} />

      </div>
    )
  }
}
