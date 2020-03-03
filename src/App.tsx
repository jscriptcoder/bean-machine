import React from 'react';

import './App.css';
import { emitter, initArray } from './utils'
import ControlPanel from './components/ControlPanel'
import BeanMachine from './components/BeanMachine'
import Machine from './models/machine';
import Ball from './models/ball';

interface AppState {
  started: boolean
  machines: Machine[]
}

export default class App extends React.Component<{}, AppState> {
  state = {
    started: false,
    machines: []
  }

  componentDidMount() {
    emitter.on('start', this.onStarted)
    emitter.on('reset', this.onReset)
    emitter.on('newmachine', this.onNewMachine)
  }

  onStarted = async (numBalls: number) => {
    const machine = new Machine(10)
    const balls = initArray(numBalls, () => new Ball())

    this.setState({
      started: true,
      machines: [machine]
    })

    await machine.dropAllBalls(balls)

    this.forceUpdate()
  }

  onReset = () => {
    this.setState({
      started: false,
      machines: []
    })
  }

  onNewMachine = async (numBalls: number) => {
    const machine = new Machine(10)
    const balls = initArray(numBalls, () => new Ball())

    this.setState({ machines: [...this.state.machines, new Machine(10)] })

    await machine.dropAllBalls(balls)

    this.forceUpdate()
  }

  render() {
    const { started, machines } = this.state

    return (
      <div className="App">
        <ControlPanel defaultNumBalls={10000} disabled={started} />
        <div className="App__machines">
          {machines.length === 0 && <span>No Machines</span>}
          {machines.length > 0 && (
            machines.map((machine, i) => (
              <BeanMachine
                key={i}
                model={machine} />
            ))
          )}
        </div>
      </div>
    )
  }
}
