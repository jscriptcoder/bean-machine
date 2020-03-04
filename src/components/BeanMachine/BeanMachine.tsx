import React from 'react'

import './BeanMachine.css'
import { emitter } from '../../utils'
import Machine from '../../models/machine'
import BeanBucket from '../BeanBucket'
import Ball from '../../models/ball'

interface BeanMachineProps { model: Machine }

interface BeanMachineState { bucketOpened: boolean }

export default class BeanMachine
  extends React.Component<BeanMachineProps, BeanMachineState> {

  state = { bucketOpened: false }

  onEmptyBucket = (balls: Ball[]) => {
    this.setState({ bucketOpened: true })
    emitter.emit('openbucket', balls)
  }

  render() {
    const { model } = this.props
    const { bucketOpened } = this.state

    const disabledMask = bucketOpened
      ? <div className="BeanMachine__mask" />
      : null

    return (
      <div className="BeanMachine">

        {disabledMask}

        {model.buckets.map((bucket, i) => (
          <BeanBucket
            key={i}
            model={bucket}
            capacity={model.totalBalls}
            onEmpty={this.onEmptyBucket} />
        ))}

      </div>
    )
  }
}
