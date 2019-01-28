

// var game = new Phaser.Game(1280, 839, Phaser.AUTO, 'main_game', { preload: preload, create: create, update: update });
//var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'main_game', { preload: preload, create: create, update: update });

Game = function(game){
    
}

Game.prototype = {
    
    
    preload: function() {
        this.game.load.spritesheet('map','../assets/map1.png');
        this.game.load.spritesheet('track','../assets/maps/monoco/track.png');
        this.game.load.physics('track_physics','../assets/maps/monoco/track_physics.json');
    
        this.game.load.spritesheet('car','../assets/car.png');
        this.game.load.spritesheet('building','../assets/building/sprite.png');
        this.game.load.spritesheet('girl','../assets/girl/betty.png');
        this.game.load.physics("collision", "../assets/building/sprite_physics.json");
    },

    create: function() {
        var map = this.game.add.sprite(0,0,'map');

        //initialize physics and groups
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        new car(this.game, 'car', 250, 250);


    },
    update: function (){
        for (var i = this.game.cars.length - 1 ; i >= 0 ; i--) {
            this.game.cars[i].update();
        }
     }
}

