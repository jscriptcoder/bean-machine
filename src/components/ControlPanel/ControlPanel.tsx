import React from 'react'
import { InputNumber, Button } from 'antd'

import './ControlPanel.css'
import { emitter } from '../../utils'

interface ControlPanelProps {
  defaultNumBalls: number
  disabled: boolean
}

interface ControlPanelState { numBalls: number | undefined }

export default class ControlPanel
  extends React.Component<ControlPanelProps, ControlPanelState> {

  constructor(props: ControlPanelProps) {
    super(props)
    this.state = { numBalls: props.defaultNumBalls }
  }

  onInputChange = (numBalls: number | undefined) => {
    this.setState({ numBalls })
  }

  onStartClick = () => {
    const { numBalls } = this.state
    emitter.emit('start', numBalls)
  }

  onResetClick = () => {
    emitter.emit('reset')
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
          onChange={this.onInputChange} />
        <Button
          type="primary"
          disabled={disabled}
          onClick={this.onStartClick}>Start</Button>
        <Button
          disabled={!disabled}
          onClick={this.onResetClick}>Reset</Button>
      </div>
    )
  }

}
