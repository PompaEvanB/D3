class G1 extends Phaser.Scene{
    constructor(){
        super("G1");
    }
    preload(){

    }
    create(){

        // add a button that lets people retry the level upon clicking it.
        let retry = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        retry.setInteractive();
        retry.on('pointerup', function(){
            this.scene.restart();
        }, this);

        let greenball = this.add.ellipse(600,500,75,75,0x00ff00); //create the greenball that will be fired
        greenball.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(greenball);
        greenball.body.setBounce(0.7);
        //redBall.body.collideWorldBounds = true;
        greenball.body.allowGravity = false;

        let velocityMultiplier2 = 4;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        let click2 = false; // check to see if the ball has been clicked on.
        let clicked2 = false; // check to see if the ball has been clicked before.
        let drag2 = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        greenball.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(click2){
                click2 = false;
            }
            else{
                click2 = true;
            }
            // set drag to true because we have not clicked off yet.
            drag2 = true;
        });

        // when the red ball is clicked off of
        greenball.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(click2){
                clicked2 = true;
            }
            else{
                clicked2 = false;
            }
            // set drag to false because we clicked off of the ball.
            drag2 = false;
        });
        //----------------------------------------------------------------------------------------------------------------------------
        let redBall = this.add.ellipse(100,100,75,75,0xff0000); // create the red ball that will be thrown
        redBall.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(redBall);
        redBall.body.setBounce(0.7);
        //redBall.body.collideWorldBounds = true;
        redBall.body.allowGravity = false;

        let velocityMultiplier = 2.5;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        let click = false; // check to see if the ball has been clicked on.
        let clicked = false; // check to see if the ball has been clicked before.
        let drag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        redBall.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(click){
                click = false;
            }
            else{
                click = true;
            }
            // set drag to true because we have not clicked off yet.
            drag = true;
        });

        // when the red ball is clicked off of
        redBall.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(click){
                clicked = true;
            }
            else{
                clicked = false;
            }
            // set drag to false because we clicked off of the ball.
            drag = false;
        });

        // if at any point we mouse up, check if we are dragging the ball.
        this.input.on('pointerup', function(pointer){
            if(drag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                redBall.body.allowGravity = true;
                redBall.body.setVelocity((redBall.x-pointer.x)*velocityMultiplier, (redBall.y-pointer.y)*velocityMultiplier);
            }
            drag = false; //set drag to false afterward because we are no longer dragging the ball.

            if(drag2){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                greenball.body.allowGravity = true;
                greenball.body.setVelocity((greenball.x-pointer.x)*velocityMultiplier2, (greenball.y-pointer.y)*velocityMultiplier2);
            }
            drag2 = false; //set drag to false afterward because we are no longer dragging the ball.
        });

        // when the mouse is moving check to see if we should be moving the ball.
        this.input.on('pointermove', function(pointer){
            // if we are dragging the mouse, we should not be moving the ball.
            if(drag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                click = false;
                clicked = false;
            }
            if(clicked){ // if this is our first click, move the ball with the mouse.
                redBall.x = pointer.x
                redBall.y = pointer.y
            }

            // if we are dragging the mouse, we should not be moving the ball.
            if(drag2){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                click2 = false;
                clicked2 = false;
            }
            if(clicked2){ // if this is our first click, move the ball with the mouse.
                greenball.x = pointer.x
                greenball.y = pointer.y
            }            
        });
        // Check for collision between ellipse1 and ellipse2
        this.physics.add.collider(greenball, redBall, collisionHandler, null, this);

        // Collision handler function
        function collisionHandler(greenball, redBall) {
            // Collision logic or actions to perform when the ellipses collide
            redBall.destroy();
        }        
    }
    update(){

    }
}

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: '#4a90e2',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [G1]
};

let game = new Phaser.Game(config);
