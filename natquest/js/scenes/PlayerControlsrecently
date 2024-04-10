
export default class PlayerControls extends Phaser.Scene {
    constructor(player, scene, input) {
        super({ key: 'PlayerControls' });

        // Initialize properties
        this.player = player;
  //      this.scene = scene;
     //   this.input = input; // Receive input manager
        this.velocityChange = 2;

    }

    init(data) {
this.player = data.player;
        this.velocityChange = 2;
}

        create() {
                      this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
        }

    update() {

        
        const playerBody = this.player.body;

        if (this.cursors.left.isDown) {
            playerBody.velocity.x = -this.velocityChange;
            console.log('forthcoingbook left');
        } else if (this.cursors.right.isDown) {
            playerBody.velocity.x = this.velocityChange;
        } else {
            playerBody.velocity.x = 0; // Stop horizontal movement when no input
        }

        if (this.cursors.up.isDown) {
            playerBody.velocity.y = -this.velocityChange;
        } else if (this.cursors.down.isDown) {
            playerBody.velocity.y = this.velocityChange;
        } else {
            playerBody.velocity.y = 0; // Stop vertical movement when no input
        }

         playerBody.velocity.x = this.velocityX;
        playerBody.velocity.y = this.velocityY;
        Matter.Body.setVelocity(playerBody, playerBody.velocity.x);
        Matter.Body.setVelocity(playerBody, playerBody.velocity.y);
        Matter.Body.setVelocity(playerBody, { x: playerBody.velocity.x, y: playerBody.velocity.y });
    }
}

window.PlayerControls = PlayerControls;
