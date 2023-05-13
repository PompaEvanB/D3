class G1 extends Phaser.Scene{
    constructor(){
        super();
    }
    preload(){

    }
    create(){
        let greenball = this.add.ellipse(600,500,75,75,0x00ff00); //create the greenball that will be fired
        greenball.setInteractive(); // make it interactable

        let redBall = this.add.ellipse(100,100,75,75,0xff0000); // create the red ball that will be thrown
        redBall.setInteractive(); // make it interactable

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        let click = false; // check to see if the ball has been clicked on.
        let clicked = false; // check to see if the ball has been clicked before.
        let drag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        redBall.on('pointerdown', function(pointer){
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
        redBall.on('pointerup', function(pointer){
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

        // if at any point we mouse up, we cannot be dragging the ball.
        this.input.on('pointerup', function(pointer){
            drag = false;
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
        });
    }
    update(){

    }
}

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: '#4a90e2',
    scene: [G1]
};

let game = new Phaser.Game(config);
