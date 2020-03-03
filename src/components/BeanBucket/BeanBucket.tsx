import React from 'react'

import './BeanBucket.css'

import { emitter } from '../../utils'
import Bucket from '../../models/bucket'

interface BeanBucketProps {
  model: Bucket
  capacity: number
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
    const { bucket, opened } = this.state
    if (!opened) {
      // We empty the bucket
      bucket.balls.length = 0
      this.setState({ bucket, opened: true })
    }
  }

  render() {
    const { capacity } = this.props
    const { bucket } = this.state
    const height = bucket.balls.length * 100 / capacity

    return (
      <div
        className="BeanBucket"
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
