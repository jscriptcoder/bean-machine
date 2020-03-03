import React from 'react'

import './BeanMachine.css'
import { emitter } from '../../utils'
import Machine from '../../models/machine'
import BeanBucket from '../BeanBucket'
import Ball from '../../models/ball'

interface BeanMachineProps {
  model: Machine
}

interface BeanMachineState {
  clicked: boolean
}

export default class BeanMachine
  extends React.Component<BeanMachineProps, BeanMachineState> {

  state = { clicked: false }

  onEmptyBucket = (balls: Ball[]) => {
    this.setState({ clicked: true })
    emitter.emit('openbucket', balls)
  }

  render() {
    const { model } = this.props
    const { clicked } = this.state

    return (
      <div className="BeanMachine">

        {clicked && <div className="BeanMachine__mask" />}

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
