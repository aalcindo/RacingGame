console.log('aaa');

// var game = new Phaser.Game(1280, 839, Phaser.AUTO, 'main_game', { preload: preload, create: create, update: update });
var game = new Phaser.Game("100", "100", Phaser.AUTO, 'main_game', { preload: preload, create: create, update: update });



function preload() {
    game.load.spritesheet('map','./assets/map1.png');
    game.load.spritesheet('car','./assets/car.png');
    game.load.spritesheet('building','./assets/building/sprite.png');
    // game.load.spritesheet('girl','./assets/girl/betty.png');
    game.load.physics("collision", "./assets/building/sprite_physics.json");
}

var cursors;
var velocity = 0;

function create() {
    var map = game.add.sprite(0,0,'map');
    
    car = game.add.sprite(570,100,'car');

    var building = game.add.sprite(640,420,'building');

    // girl = game.add.sprite(570,100,'girl');
    
                                     

    
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.enable(car,false);
    car.body.angle = 90;

    //collision group for objects    
    var carCollisionGroup = game.physics.p2.createCollisionGroup();
    var buildingCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    //enable phisics for building
    game.physics.p2.enable(building,true);
    building.body.kinematic = true;// building is an immovable object
    building.body.clearShapes();//deleting the bounding box, that is laying on the building on default:
    building.body.loadPolygon('collision','building');//we’re loading our own bounding box, which we’ve exported from physics editor
    
    // we map the collision groups to the car and the building:
    car.body.setCollisionGroup(carCollisionGroup);
    building.body.setCollisionGroup(buildingCollisionGroup);
    //we’re configuring, that the car and the building will collide:
    car.body.collides([carCollisionGroup,buildingCollisionGroup]);
    building.body.collides([buildingCollisionGroup,carCollisionGroup]);

    game.physics.p2.enable(car,true);
}

function test(){console.log("colide")}

function update(){
    if (cursors.up.isDown && velocity <= 400)
            velocity+=7;
    else if (cursors.down.isDown && velocity <= 400)
        if(velocity>0)    
            velocity-=7;
        else{ 
            if(velocity>-150)
                velocity-=3;
        }
    else {
        if (velocity >= 7)
            velocity -= 7;
        if (velocity <= -3)
            velocity += 3;
        
    }
    // console.log(velocity);

    
    
                            
    car.body.velocity.x = velocity * Math.cos((car.angle-90)*0.01745);
    car.body.velocity.y = velocity * Math.sin((car.angle-90)*0.01745);
                    
    if (cursors.left.isDown)
        car.body.angularVelocity = -5*(velocity/1000);
    else if (cursors.right.isDown)
        car.body.angularVelocity = 5*(velocity/1000);
    else
        car.body.angularVelocity = 0;

}