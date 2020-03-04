import React from 'react'
import { Affix } from 'antd'

import './App.css'
import { emitter, initArray } from './utils'
import ControlPanel from './components/ControlPanel'
import BeanMachine from './components/BeanMachine'
import Machine from './models/machine'
import Ball from './models/ball'

interface AppProps { numBuckets: number }

interface AppState {
  started: boolean
  machines: Machine[]
}

export default class App
  extends React.Component<AppProps, AppState> {

  state = {
    started: false,
    machines: []
  }

  componentDidMount() {
    emitter.on('start', this.onStarted)
    emitter.on('reset', this.onReset)
    emitter.on('openbucket', this.onOpenBucket)
  }

  onStarted = async (numBalls: number) => {
    const { numBuckets } = this.props

    const machine = new Machine(numBuckets)
    const balls = initArray(numBalls, () => new Ball())

    this.setState({
      started: true,
      machines: [machine]
    })

    await machine.dropAllBalls(balls)

    // Model changed. We need to re-render.
    // Definitely not the most efficient way to do it,
    // but for this toy exercise is enough
    this.forceUpdate()
  }

  onReset = () => {
    this.setState({
      started: false,
      machines: []
    })
  }

  // Triggers when we open a bucket,
  // dropping the balls from the previous
  // bucket through a new machine
  onOpenBucket = async (balls: Ball[]) => {
    const { numBuckets } = this.props
    const machine = new Machine(numBuckets)

    this.setState({ machines: [...this.state.machines, machine] })

    await machine.dropAllBalls(balls)

    this.forceUpdate() // model changed. We need to re-render

    // Nasty scrolling, wild west like
    window.scrollTo(0,document.body.scrollHeight)
  }

  render() {
    const { started, machines } = this.state

    const runningMachines = machines.length
      ? (
        machines.map((machine, i) => (
          <BeanMachine
            key={i}
            model={machine} />
        ))
      )
      : <h2>No Machines</h2>

    return (
      <div className="App">

        <Affix offsetTop={16}>
          <ControlPanel
            defaultNumBalls={10000}
            disabled={started} />
        </Affix>

        <div className="App__machines">
          {runningMachines}
        </div>

      </div>
    )
  }
}
