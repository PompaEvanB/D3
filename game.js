let score = 0;
let totalspeed = 0;
let tempdistanceX = 0;
let tempdistanceY = 0;
let totaldistance = 0;

let greenVelocityMultiplier = 4;
let redVelocityMultiplier = 2.5;

let greenClick = false; // check to see if the ball has been clicked on.
let greenClicked = false; // check to see if the ball has been clicked before.
let greenDrag = false; // check to see if the ball is being dragged.

let redClick = false; // check to see if the ball has been clicked on.
let redClicked = false; // check to see if the ball has been clicked before.
let redDrag = false; // check to see if the ball is being dragged.

class G1 extends Phaser.Scene{
    constructor(){
        super("G1");
    }
    create(){
        score = 0;
        totalspeed = 0;
        tempdistanceX = 0;
        tempdistanceY = 0;
        totaldistance = 0;  

        // add a button that lets people retry the level upon clicking it.
        let retry = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        retry.setInteractive();
        retry.on('pointerup', function(){
            this.scene.restart();
        }, this);

        let next = this.add.text(400, 0, 'Next', { font: '40px "Press Start 2P"' });
        next.setInteractive();
        next.on('pointerup', function(){
            this.scene.start("S1");
        }, this);

        let greenball = this.add.ellipse(600,500,75,75,0x00ff00); //create the greenball that will be fired
        greenball.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(greenball);
        greenball.body.setBounce(0.7);
        greenball.body.allowGravity = false;

        greenVelocityMultiplier = 4;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        greenClick = false; // check to see if the ball has been clicked on.
        greenClicked = false; // check to see if the ball has been clicked before.
        greenDrag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        greenball.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(greenClick){
                greenClick = false;
            }
            else{
                greenClick = true;
            }
            // set drag to true because we have not clicked off yet.
            greenDrag = true;
        });

        // when the red ball is clicked off of
        greenball.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(greenClick){
                greenClicked = false;
            }
            else{
                greenClicked = true;
            }
            // set drag to false because we clicked off of the ball.
            greenDrag = false;
        });

        //----------------------------------------------------------------------------------------------------------------------------

        let redBall = this.add.ellipse(100,100,75,75,0xff0000); // create the red ball that will be thrown
        redBall.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(redBall);
        redBall.body.setBounce(0.7);
        redBall.body.allowGravity = false;

        redVelocityMultiplier = 2.5;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        redClick = false; // check to see if the ball has been clicked on.
        redClicked = false; // check to see if the ball has been clicked before.
        redDrag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        redBall.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(redClick){
                redClick = false;
            }
            else{
                redClick = true;
            }
            // set drag to true because we have not clicked off yet.
            redDrag = true;
        });

        // when the red ball is clicked off of
        redBall.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(redClick){
                redClicked = true;
            }
            else{
                redClicked = false;
            }
            // set drag to false because we clicked off of the ball.
            redDrag = false;
        });

        // if at any point we mouse up, check if we are dragging the ball.
        this.input.on('pointerup', function(pointer){
            if(redDrag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                tempdistanceX = redBall.x;
                tempdistanceY = redBall.y;
                redBall.body.allowGravity = true;
                redBall.body.setVelocity((redBall.x-pointer.x)*redVelocityMultiplier, (redBall.y-pointer.y)*redVelocityMultiplier);

            }
            redDrag = false; //set drag to false afterward because we are no longer dragging the ball.

            if(greenDrag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                greenball.body.allowGravity = true;
                greenball.body.setVelocity((greenball.x-pointer.x)*greenVelocityMultiplier, (greenball.y-pointer.y)*greenVelocityMultiplier);
            }
            greenDrag = false; //set drag to false afterward because we are no longer dragging the ball.
        });

        // when the mouse is moving check to see if we should be moving the ball.
        this.input.on('pointermove', function(pointer){
            // if we are dragging the mouse, we should not be moving the ball.
            if(redDrag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                redClick = false;
                redClicked = false;
            }
            if(redClicked){ // if this is our first click, move the ball with the mouse.
                redBall.x = pointer.x
                redBall.y = pointer.y
            }

            // if we are dragging the mouse, we should not be moving the ball.
            if(greenDrag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                greenClick = false;
                greenClicked = false;
            }
            if(greenClicked){ // if this is our first click, move the ball with the mouse.
                greenball.x = pointer.x
                greenball.y = pointer.y
            }            
        });
        // Check for collision between ellipse1 and ellipse2
        this.physics.add.collider(greenball, redBall, collisionHandler, null, this);

        // Collision handler function
        function collisionHandler(greenball,redBall) {
            // Collision logic or actions to perform when the ellipses collide
            if(redBall.body.velocity.x < 0 && redBall.body.velocity.y < 0){
                totalspeed = (redBall.body.velocity.x)*-1+(redBall.body.velocity.y)*-1;
            }
            else if(redBall.body.velocity.x > 0 && redBall.body.velocity.y < 0){
                totalspeed = redBall.body.velocity.x+(redBall.body.velocity.y)*-1;
            }
            else if(redBall.body.velocity.x < 0 && redBall.body.velocity.y > 0){
                totalspeed = (redBall.body.velocity.x)*-1+redBall.body.velocity.y;
            }
            else{
                totalspeed = redBall.body.velocity.x+redBall.body.velocity.y;
            }
            totaldistance = Math.sqrt(Math.pow(redBall.x-tempdistanceX,2)+Math.pow(redBall.y-tempdistanceY,2));
            if(totaldistance < 0){
                totaldistance = totaldistance * -1;
            }
            score = Math.round(totalspeed + totaldistance);
            if(score < 0){
                score = score * -1;
            }
            redBall.destroy();
        }        
    }
}

class S1 extends Phaser.Scene{
    constructor(){
        super("S1");
    }
    create(){

        let prev = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        prev.setInteractive();
        prev.on('pointerup', function(){
            this.scene.start("G1");
        }, this);

        let Continue = this.add.text(400, 0, 'Next', { font: '40px "Press Start 2P"' });
        Continue.setInteractive();
        Continue.on('pointerup', function(){
            this.scene.start("G2");
        }, this);

       this.add.text(350, 350, "Score: "+ score, { font: '75px "Press Start 2P"' });
    }
}

class G2 extends Phaser.Scene{
    constructor(){
        super("G2");
    }
    create(){
        score = 0;
        totalspeed = 0;
        tempdistanceX = 0;
        tempdistanceY = 0;
        totaldistance = 0;  

        // add a button that lets people retry the level upon clicking it.
        let retry2 = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        retry2.setInteractive();
        retry2.on('pointerup', function(){
            this.scene.restart();
        }, this);

        let next2 = this.add.text(400, 0, 'Next', { font: '40px "Press Start 2P"' });
        next2.setInteractive();
        next2.on('pointerup', function(){
            this.scene.start("S2");
        }, this);

        let greenball2 = this.add.ellipse(600,500,75,75,0x00ff00); //create the greenball that will be fired
        greenball2.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(greenball2);
        greenball2.body.setBounce(0.7);
        greenball2.body.allowGravity = false;

        greenVelocityMultiplier = 30;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        greenClick = false; // check to see if the ball has been clicked on.
        greenClicked = false; // check to see if the ball has been clicked before.
        greenDrag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        greenball2.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(greenClick){
                greenClick = false;
            }
            else{
                greenClick = true;
            }
            // set drag to true because we have not clicked off yet.
            greenDrag = true;
        });

        // when the red ball is clicked off of
        greenball2.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(greenClick){
                greenClicked = true;
            }
            else{
                greenClicked = false;
            }
            // set drag to false because we clicked off of the ball.
            greenDrag = false;
        });

        //----------------------------------------------------------------------------------------------------------------------------

        let redBall2 = this.add.ellipse(100,100,75,75,0xff0000); // create the red ball that will be thrown
        redBall2.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(redBall2);
        redBall2.body.setBounce(0.7);
        redBall2.body.allowGravity = false;

        redVelocityMultiplier = 10;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        redClick = false; // check to see if the ball has been clicked on.
        redClicked = false; // check to see if the ball has been clicked before.
        redDrag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        redBall2.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(redClick){
                redClick = false;
            }
            else{
                redClick = true;
            }
            // set drag to true because we have not clicked off yet.
            redDrag = true;
        });

        // when the red ball is clicked off of
        redBall2.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(redClick){
                redClicked = true;
            }
            else{
                redClicked = false;
            }
            // set drag to false because we clicked off of the ball.
            redDrag = false;
        });

        // if at any point we mouse up, check if we are dragging the ball.
        this.input.on('pointerup', function(pointer){
            if(redDrag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                tempdistanceX = redBall2.x;
                tempdistanceY = redBall2.y;
                redBall2.body.allowGravity = true;
                redBall2.body.setVelocity((redBall2.x-pointer.x)*redVelocityMultiplier, (redBall2.y-pointer.y)*redVelocityMultiplier);

            }
            redDrag = false; //set drag to false afterward because we are no longer dragging the ball.

            if(greenDrag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                greenball2.body.allowGravity = true;
                greenball2.body.setVelocity((greenball2.x-pointer.x)*greenVelocityMultiplier, (greenball2.y-pointer.y)*greenVelocityMultiplier);
            }
            greenDrag = false; //set drag to false afterward because we are no longer dragging the ball.
        });

        // when the mouse is moving check to see if we should be moving the ball.
        this.input.on('pointermove', function(pointer){
            // if we are dragging the mouse, we should not be moving the ball.
            if(redDrag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                redClick = false;
                redClicked = false;
            }
            if(redClicked){ // if this is our first click, move the ball with the mouse.
                redBall2.x = pointer.x
                redBall2.y = pointer.y
            }

            // if we are dragging the mouse, we should not be moving the ball.
            if(greenDrag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                greenClick = false;
                greenClicked = false;
            }
            if(greenClicked){ // if this is our first click, move the ball with the mouse.
                greenball2.x = pointer.x
                greenball2.y = pointer.y
            }            
        });
        // Check for collision between ellipse1 and ellipse2
        this.physics.add.collider(greenball2, redBall2, collisionHandler, null, this);

        // Collision handler function
        function collisionHandler(greenball2,redBall2) {
            // Collision logic or actions to perform when the ellipses collide
            if(redBall2.body.velocity.x < 0 && redBall2.body.velocity.y < 0){
                totalspeed = (redBall2.body.velocity.x)*-1+(redBall2.body.velocity.y)*-1;
            }
            else if(redBall2.body.velocity.x > 0 && redBall2.body.velocity.y < 0){
                totalspeed = redBall2.body.velocity.x+(redBall2.body.velocity.y)*-1;
            }
            else if(redBall2.body.velocity.x < 0 && redBall2.body.velocity.y > 0){
                totalspeed = (redBall2.body.velocity.x)*-1+redBall2.body.velocity.y;
            }
            else{
                totalspeed = redBall2.body.velocity.x+redBall2.body.velocity.y;
            }
            totaldistance = Math.sqrt(Math.pow(redBall2.x-tempdistanceX,2)+Math.pow(redBall2.y-tempdistanceY,2));
            if(totaldistance < 0){
                totaldistance = totaldistance * -1;
            }
            score = Math.round(totalspeed + totaldistance);
            if(score < 0){
                score = score * -1;
            }
            redBall2.destroy();
        }        
    }
}

class S2 extends Phaser.Scene{
    constructor(){
        super("S2");
    }
    create(){

        let prev2 = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        prev2.setInteractive();
        prev2.on('pointerup', function(){
            this.scene.start("G2");
        }, this);

        let Continue2 = this.add.text(400, 0, 'Next', { font: '40px "Press Start 2P"' });
        Continue2.setInteractive();
        Continue2.on('pointerup', function(){
            this.scene.start("G3");
        }, this);

       this.add.text(350, 350, "Score: "+ score, { font: '75px "Press Start 2P"' });
    }
}

class G3 extends Phaser.Scene{
    constructor(){
        super("G3");
    }
    create(){
        score = 0;
        totalspeed = 0;
        tempdistanceX = 0;
        tempdistanceY = 0;
        totaldistance = 0;  

        // add a button that lets people retry the level upon clicking it.
        let retry3 = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        retry3.setInteractive();
        retry3.on('pointerup', function(){
            this.scene.restart();
        }, this);

        let next3 = this.add.text(400, 0, 'Next', { font: '40px "Press Start 2P"' });
        next3.setInteractive();
        next3.on('pointerup', function(){
            this.scene.start("S3");
        }, this);

        let greenball3 = this.add.ellipse(600,500,75,75,0x00ff00); //create the greenball that will be fired
        greenball3.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(greenball3);
        greenball3.body.setBounce(0.7);
        greenball3.body.allowGravity = false;

        greenVelocityMultiplier = .3;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        greenClick = false; // check to see if the ball has been clicked on.
        greenClicked = false; // check to see if the ball has been clicked before.
        greenDrag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        greenball3.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(greenClick){
                greenClick = false;
            }
            else{
                greenClick = true;
            }
            // set drag to true because we have not clicked off yet.
            greenDrag = true;
        });

        // when the red ball is clicked off of
        greenball3.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(greenClick){
                greenClicked = true;
            }
            else{
                greenClicked = false;
            }
            // set drag to false because we clicked off of the ball.
            greenDrag = false;
        });

        //----------------------------------------------------------------------------------------------------------------------------

        let redBall3 = this.add.ellipse(100,100,75,75,0xff0000); // create the red ball that will be thrown
        redBall3.setInteractive(); // make it interactable

        //Add the future physics for the red ball, but deactivate them until we need them
        this.physics.add.existing(redBall3);
        redBall3.body.setBounce(0.7);
        redBall3.body.allowGravity = false;

        redVelocityMultiplier = 0.1;

        // if the redball is clicked, it moves with the mouse. the next time it is clicked, it gets placed down.
        // if the red ball is dragged, it will shoot from its current position in the opposite direction from the mouse.

        redClick = false; // check to see if the ball has been clicked on.
        redClicked = false; // check to see if the ball has been clicked before.
        redDrag = false; // check to see if the ball is being dragged.

        // when the red ball is clicked on
        redBall3.on('pointerdown', function(){
            // tell the game that the ball has been clicked by changing to boolean
            if(redClick){
                redClick = false;
            }
            else{
                redClick = true;
            }
            // set drag to true because we have not clicked off yet.
            redDrag = true;
        });

        // when the red ball is clicked off of
        redBall3.on('pointerup', function(){
            // if the ball has been clicked before, let the game know by setting clicked to false.
            if(redClick){
                redClicked = true;
            }
            else{
                redClicked = false;
            }
            // set drag to false because we clicked off of the ball.
            redDrag = false;
        });

        // if at any point we mouse up, check if we are dragging the ball.
        this.input.on('pointerup', function(pointer){
            if(redDrag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                tempdistanceX = redBall3.x;
                tempdistanceY = redBall3.y;
                redBall3.body.allowGravity = true;
                redBall3.body.setVelocity((redBall3.x-pointer.x)*redVelocityMultiplier, (redBall3.y-pointer.y)*redVelocityMultiplier);

            }
            redDrag = false; //set drag to false afterward because we are no longer dragging the ball.

            if(greenDrag){ // if we ARE dragging the ball, shoot the ball based off of the mouses inverted position AND enable physics for the ball.
                greenball3.body.allowGravity = true;
                greenball3.body.setVelocity((greenball3.x-pointer.x)*greenVelocityMultiplier, (greenball3.y-pointer.y)*greenVelocityMultiplier);
            }
            greenDrag = false; //set drag to false afterward because we are no longer dragging the ball.
        });

        // when the mouse is moving check to see if we should be moving the ball.
        this.input.on('pointermove', function(pointer){
            // if we are dragging the mouse, we should not be moving the ball.
            if(redDrag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                redClick = false;
                redClicked = false;
            }
            if(redClicked){ // if this is our first click, move the ball with the mouse.
                redBall3.x = pointer.x
                redBall3.y = pointer.y
            }

            // if we are dragging the mouse, we should not be moving the ball.
            if(greenDrag){
                // reset both click and clicked to ensure we will always be able to move the ball after we drag.
                greenClick = false;
                greenClicked = false;
            }
            if(greenClicked){ // if this is our first click, move the ball with the mouse.
                greenball3.x = pointer.x
                greenball3.y = pointer.y
            }            
        });
        // Check for collision between ellipse1 and ellipse2
        this.physics.add.collider(greenball3, redBall3, collisionHandler, null, this);

        // Collision handler function
        function collisionHandler(greenball3,redBall3) {
            // Collision logic or actions to perform when the ellipses collide
            if(redBall3.body.velocity.x < 0 && redBall3.body.velocity.y < 0){
                totalspeed = (redBall3.body.velocity.x)*-1+(redBall3.body.velocity.y)*-1;
            }
            else if(redBall3.body.velocity.x > 0 && redBall3.body.velocity.y < 0){
                totalspeed = redBall3.body.velocity.x+(redBall3.body.velocity.y)*-1;
            }
            else if(redBall3.body.velocity.x < 0 && redBall3.body.velocity.y > 0){
                totalspeed = (redBall3.body.velocity.x)*-1+redBall3.body.velocity.y;
            }
            else{
                totalspeed = redBall3.body.velocity.x+redBall3.body.velocity.y;
            }
            totaldistance = Math.sqrt(Math.pow(redBall3.x-tempdistanceX,2)+Math.pow(redBall3.y-tempdistanceY,2));
            if(totaldistance < 0){
                totaldistance = totaldistance * -1;
            }
            score = Math.round(totalspeed + totaldistance);
            if(score < 0){
                score = score * -1;
            }
            redBall3.destroy();
        }        
    }
}

class S3 extends Phaser.Scene{
    constructor(){
        super("S3");
    }
    create(){

        let prev3 = this.add.text(0, 0, 'Retry', { font: '40px "Press Start 2P"' });
        prev3.setInteractive();
        prev3.on('pointerup', function(){
            this.scene.start("G3");
        }, this);

        let Continue3 = this.add.text(400, 0, 'Go back to start', { font: '40px "Press Start 2P"' });
        Continue3.setInteractive();
        Continue3.on('pointerup', function(){
            this.scene.start("G1");
        }, this);

       this.add.text(350, 350, "Score: "+ score, { font: '75px "Press Start 2P"' });
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
    scene: [G1,S1,G2,S2,G3,S3]
};

let game = new Phaser.Game(config);