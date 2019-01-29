import Game from './state/Game.js'

class App extends Phaser.Game {
  constructor () {
    super(1920, 1080, Phaser.AUTO)
    this.state.add('Game', Game)
    this.state.start('Game')
  }
}

const SimpleGame = new App()