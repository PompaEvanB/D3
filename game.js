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

        let isDragging = false;
        let isclicked = false;
        let clicked = false;

        // when the red ball is pressed
        redBall.on('pointerdown', function(pointer){
            isDragging = true;
            isclicked = false;
        });

        // when the red ball is clicked on
        redBall.on('pointerup', function(pointer){
            if(!clicked){
                clicked = true;
            }
            else{
                clicked = false;
            }
            isclicked = true;
            isDragging = false;

        });

        // when the mouse is moving  ADD DRAGGING RESETTING CLICK
        this.input.on('pointermove', function(pointer){
            if(isclicked && clicked){
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
