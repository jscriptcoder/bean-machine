import React from 'react'
import { InputNumber, Button } from 'antd'

import './ControlPanel.css'
import { emitter } from '../../utils'

interface ControlPanelProps {
  defaultNumBalls: number
  disabled: boolean
}

interface ControlPanelState {
  numBalls: number | undefined
}

export default class ControlPanel
  extends React.Component<ControlPanelProps, ControlPanelState> {

  constructor(props: ControlPanelProps) {
    super(props)
    this.state = { numBalls: props.defaultNumBalls }
  }

  render() {
    const { disabled } = this.props
    const { numBalls } = this.state
    return (
      <div className="ControlPanel">
        Number of balls:
        &nbsp;
        <InputNumber
          value={numBalls}
          disabled={disabled}
          onChange={numBalls => this.setState({ numBalls })} />
        <Button
          type="primary"
          disabled={disabled}
          onClick={() => emitter.emit('start', numBalls)}>Start</Button>
        <Button
          disabled={!disabled}
          onClick={() => emitter.emit('reset')}>Reset</Button>
      </div>
    )
  }

}
