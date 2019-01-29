// import { WORLD_SIZE } from '../config'
import { createText } from './utils/index.js'
import fileLoader from '../config/fileloader.js'
import createWorld from './world/createWorld.js'
import player from './player/index.js'
import newPlayer from './sockets/newPlayer.js'
import updatePlayers from './sockets/updatePlayers.js'
import playerMovementInterpolation from './predictions/playerMovementInterpolation.js'

const SERVER_IP = 'http://localhost:8000'
let socket = null
let otherPlayers = {}

class Game extends Phaser.State {
  constructor () {
    super()
    this.player = {}
  }

  preload () {
    // Loads files
    fileLoader(this.game)
  }

  create () {
    // const { width, height } = WORLD_SIZE
    // Creates the world
    createWorld(this.game)
    // // Connects the player to the server
    var socket = io(SERVER_IP)
    // // Creates the player passing the X, Y, game and socket as arguments
    this.player = player(250,250, this.game, socket)
    // // Creates the player name text
    this.player.playerName = createText(this.game, this.player.sprite.body)
    // Creates the player speed text
    this.player.speedText = createText(this.game, this.player.sprite.body)

    // // Sends a new-player event to the server
    newPlayer(socket, this.player)
    // // update all players
    updatePlayers(socket, otherPlayers, this.game)

    // // Configures the game camera
    // this.game.camera.x = this.player.sprite.x - 800 / 2
    // this.game.camera.y = this.player.sprite.y - 600 / 2

    // // Scale game to fit the entire window
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  update () {
    this.player.drive(this.game)
    // // Move the camera to follow the player
    // let cameraX = this.player.sprite.x - 800 / 2
    // let cameraY = this.player.sprite.y - 600 / 2
    // this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
    // this.game.camera.y += (cameraY - this.game.camera.y) * 0.08

    // // Interpolates the players movement
    playerMovementInterpolation(otherPlayers)
  }
}

export default Game