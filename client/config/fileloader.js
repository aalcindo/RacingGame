
const fileLoader = game => {
    game.load.crossOrigin = 'Anonymous'
    game.load.image('background', `../assets/backgrounds/grass.png`)
    game.load.image('car', `../assets/sprites/lambo/car.png`)
  }
  
  export default fileLoader