export default class Ball {
  pLeft: number // Propability of bouncing left
  pRight: number // Propability of bouncing right

  constructor(pLeft: number = 0.5) {
    this.pLeft = pLeft
    this.pRight = 1 - pLeft
  }
}
