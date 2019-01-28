
/**
 * Phaser snake
 * @param  {Phaser.Game} game      game object
 * @param  {String} spriteKey Phaser sprite key
 * @param  {Number} x         coordinate
 * @param  {Number} y         coordinate
 */

car = function(game, spriteKey,x,y){
    this.game = game;
    this.debug = false;
    this.spriteKey = spriteKey;
    this.velocity = 0;

    //create an array of snakes in the game object and add this snake
    if (!this.game.cars) {
        this.game.cars = [];
    }
    this.game.cars.push(this);

    this.sprite = game.add.sprite(x,y,'car');
    game.physics.p2.enable(this.sprite,true);
    console.log(this.sprite.body);
    this.collisionGroup = this.game.physics.p2.createCollisionGroup();
    this.sectionGroup = this.game.add.group();

    this.cursors = this.game.input.keyboard.createCursorKeys();
}

car.prototype = {

    
    update: function(){
        var cursors = this.cursors;
        if (cursors.up.isDown && this.velocity <= 400)
            this.velocity+=7;
        else if (cursors.down.isDown && this.velocity <= 400)
            if(this.velocity>0)    
                this.velocity-=7;
            else{ 
                if(this.velocity>-150)
                    this.velocity-=3;
            }
        else {
            if (this.velocity >= 7)
                this.velocity -= 7;
            if (this.velocity <= -3)
                this.velocity += 3;
            
        }
        // console.log(this.velocity);



    
        this.sprite.body.velocity.x = this.velocity * Math.cos((this.sprite.angle-90)*0.01745);
        this.sprite.body.velocity.y = this.velocity * Math.sin((this.sprite.angle-90)*0.01745);
                        
        if (cursors.left.isDown)
            this.sprite.body.angularVelocity = -5*(this.velocity/1000);
        else if (cursors.right.isDown)
            this.sprite.body.angularVelocity = 5*(this.velocity/1000); //increase 5 to make turns sharper
        else
            this.sprite.body.angularVelocity = 0;

            }
}