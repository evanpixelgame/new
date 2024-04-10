
export default class ComputerControls extends Phaser.Scene  {
  constructor() {
    super({ key: 'ComputerControls' });

    this.player = null; // Initialize player reference
    this.speed = 0; // Initialize speed
    this.velocityChange = 2;
  }

  
    init(data) {
    // Retrieve player reference and speed from the data object
    this.player = data.player;
    this.speed = data.speed;
     this.velocityChange = data.velocityChange; // Pass velocityX

  console.log("Received player in ComputerControls:", this.player); // Log player reference
  }

  
  preload() {

  }

  create() {

  // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  }

update(time, delta) {

      if (!this.player) {
        return;
    }

   const playerBody = this.player.body;
    let velocityX = playerBody.velocity.x;
    let velocityY = playerBody.velocity.y;
  const velocityChange = 2; // Adjust based on desired speed

  
        if (this.cursors.left.isDown) {
            playerBody.velocity.x = -velocityChange;
            console.log('key is pressed left i think');
        } else if (this.cursors.right.isDown) {
            playerBody.velocity.x = velocityChange;
                  console.log('key is pressed right i think');
        } else {
            playerBody.velocity.x = 0; // Stop horizontal movement when no input
        }

        if (this.cursors.up.isDown) {
            playerBody.velocity.y = -velocityChange;
             console.log('key is pressed up i think');
        } else if (this.cursors.down.isDown) {
            playerBody.velocity.y = velocityChange;
             console.log('key is pressed down i think');
        } else {
            playerBody.velocity.y = 0; // Stop vertical movement when no input
        }

        playerBody.velocity.x = this.velocityX;
        playerBody.velocity.y = this.velocityY;
     //   Matter.Body.setVelocity(playerBody, playerBody.velocity.x);
     //   Matter.Body.setVelocity(playerBody, playerBody.velocity.y);
        Matter.Body.setVelocity(playerBody, { x: playerBody.velocity.x, y: playerBody.velocity.y });



        console.log("Received player in PlayerControls:", this.player, this.player.body); // Log player reference  //BOTH LOGGING SUCCESSFULLY
        console.log("Received velocity in PlayerControls:", playerBody.velocity.x, playerBody.velocity.y);

 
console.log(this.player);
    console.log(this.player.body);
   console.log(this.player.body.velocity);

    // Play appropriate animation based on movement direction
    if (velocityX !== 0 || velocityY !== 0) {
        if (velocityX > 0) {
            this.player.anims.play('walking-right', true);
        } else if (velocityX < 0) {
            this.player.anims.play('walking-left', true);
        } else if (velocityY < 0) {
            this.player.anims.play('walking-down', true);
        } else if (velocityY > 0) {
            this.player.anims.play('walking-up', true);
        }
    } else {
        // Stop animation when no movement
        this.player.anims.stop();
    }
   this.player.setRotation(0);
}
}
window.ComputerControls = ComputerControls;
