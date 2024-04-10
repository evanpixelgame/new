'use strict'

class MobileControls extends Phaser.Scene {
    constructor() {
        super({
            key: 'MobileControls'
        })
    }

       init(data) {
    this.player = data.player;
    this.speed = data.speed;
  }

    preload() {
        
    }

    create() {

       this.openWorldScene = this.scene.get('OpenWorld');
        this.player = this.openWorldScene.player;
        this.speed = this.openWorldScene.speed;
        
    const posX = 80; //window.innerWidth; //this.game.config.width / 5;
    const posY = window.innerHeight - 80;

        const base = this.add.image(0, 0, this.textures.get('base'));
    const thumb = this.add.image(0, 0, this.textures.get('thumb'));

    // Set the scale for base and thumb images
    base.setScale(0.5); // Adjust the scale as needed
    thumb.setScale(0.5);
        
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: posX,
                y: posY,
                radius: 50,
                base: base,
                thumb: thumb,
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on('update', this.dumpJoyStickState, this);

        this.text = this.add.text(0, 0);
        this.dumpJoyStickState();

           if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    // Code for Android or iOS
   this.scale.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
//    this.scene.launch('MobileControls');
      
         if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
 }
    }

    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }

        s += `
Force: ${Math.floor(this.joyStick.force * 100) / 100}
Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
`;

        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }
       // this.text.setText(s); // <================diagnostic test data
    }
      update() {
        // Get the joystick cursor keys
        var cursorKeys = this.joyStick.createCursorKeys();

        // Check the joystick input and update player movement
        let velocityX = 0;
        let velocityY = 0;

        if (cursorKeys.up.isDown) {
            velocityY = -this.speed;
        } else if (cursorKeys.down.isDown) {
            velocityY = this.speed;
        }

        if (cursorKeys.left.isDown) {
            velocityX = -this.speed;
        } else if (cursorKeys.right.isDown) {
            velocityX = this.speed;
        }


         // Normalize velocity to prevent faster movement diagonally
    if (velocityX !== 0 && velocityY !== 0) {
        const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX *= this.speed / magnitude;
        velocityY *= this.speed / magnitude;
    }     
          
    // Set the velocity of the player sprite
    this.player.setVelocity(velocityX, velocityY);

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

window.MobileControls = MobileControls;
