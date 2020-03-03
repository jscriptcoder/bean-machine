import React from 'react'

import './BeanMachine.css'
import Machine from '../../models/machine'
import BeanBucket from '../BeanBucket'

interface BeanMachineProps {
  model: Machine
}

export default function BeanMachine(props: BeanMachineProps) {
  const { model } = props

  return (
    <div className="BeanMachine">
      {model.buckets.map((bucket, i) => (
        <BeanBucket
          key={i}
          model={bucket}
          capacity={model.totalBalls} />
      ))}
    </div>
  )
}
