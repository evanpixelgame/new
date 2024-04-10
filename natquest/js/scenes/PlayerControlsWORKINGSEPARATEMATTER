export default class PlayerControls extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayerControls' });
        this.velocityChange = 0.01; // This is now an acceleration value for Matter.js
    }

    init(data) {
        this.player = data.player;
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
        if (!this.player) return; // Guard clause
        console.log(this.player);
        console.log(this.player.body);

        const force = this.velocityChange;

        if (this.cursors.left.isDown) {
            // Apply force to move left
            this.player.applyForce({ x: -force, y: 0 });
        } else if (this.cursors.right.isDown) {
            // Apply force to move right
            this.player.applyForce({ x: force, y: 0 });
        }

        if (this.cursors.up.isDown) {
            // Apply force to move up (negative y in Matter.js is up)
            this.player.applyForce({ x: 0, y: -force });
        } else if (this.cursors.down.isDown) {
            // Apply force to move down
            this.player.applyForce({ x: 0, y: force });
        }

        console.log(this.player.velocity);
    }
}

window.PlayerControls = PlayerControls;
