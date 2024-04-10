
class PlayerAnimations extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerAnimations' });
    
    // Declare controls as a property of the class
  }
      
  preload() {
  
  }

  create() {
 this.openWorldScene = this.scene.get('OpenWorld');
 this.player = this.scene.get('OpenWorld').player;  
 this.speed = this.openWorldScene.speed;
 this.createAnimations();
  } 
  
  createAnimations() {
    this.anims.create({
        key: 'walking-up',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              130, 131, 132, 133, 134, 135, 136, 137, 138
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-left',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              117, 118, 119, 120, 121, 122, 123, 124, 125
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-down',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                104, 105, 106, 107, 108, 109, 110, 111, 112
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-right',
        frames: this.anims.generateFrameNames('player', {
            frames: [
              143, 144, 145, 146, 147, 148, 149, 150, 151 
            ]
        }),
        yoyo: false,
        frameRate: 12,
        repeat: -1
    });
  } 

  update(time, delta) {
    
  }
}
window.PlayerAnimations = PlayerAnimations;
