//import { gameManager } from '../../gameState.js';
import OpenWorld from '../scenes/OpenWorld.js';
export class WelcomePlayer extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomePlayer' });
  }


  preload() {


    if (gameManager.selectedCharacter == 'Baby Mouse') {
      this.load.spritesheet("player", "assets/sprites/player/babyMouse.png", {
        frameWidth: 64,
        frameHeight: 64
      });
    } else if (gameManager.selectedCharacter == 'Confused Woman') {

      this.load.spritesheet("player", "assets/sprites/player/womanPlayer.png", {
        frameWidth: 64,
        frameHeight: 64
      });
    } else {
      this.load.spritesheet("player", "assets/sprites/player/fatWolf.png", {
        frameWidth: 64,
        frameHeight: 64
      });
    }

  }

  create() {

    console.log(gameManager.selectedCharacter + ': should be being displayed');

    const vw = window.innerWidth;
    const xMid = vw * .5;
    const vh = window.innerHeight;

    const graphics = this.add.graphics();

    // Fill the background with a solid color
    graphics.fillStyle(0xfdd5d5); // Specify the color (black in this case)
    graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);


    const backdrop = this.add.graphics();
    backdrop.fillStyle(0xE6E6FA, .7);
    backdrop.lineStyle(4, 0x000000, 1);
    backdrop.fillRect(vw * .05, vh * .05, vw * .9, vh * .85);

    const beginButton = this.add.text(xMid, vh * .8, 'Start', {
      fontSize: '48px',
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();



    // Set a callback function for the button click event
    beginButton.on('pointerdown', function () {
      const orientation = window.screen.orientation.type;
      // Check if the device is in landscape mode
      if (orientation.includes('landscape')) {
        // Execute event handler code only in landscape mode
        this.scene.add('OpenWorld', OpenWorld);
        this.scene.launch('OpenWorld');
        console.log('Click event in landscape mode2');
      } else {
        // Ignore the click event in portrait mode
        console.log('Ignoring click event in portrait mode2');
        alert('please enter landscape mode to begin');
      }
    }, this);


    // Declaration and initialization of welcomeTextBlock
    const welcomeTextBlock = this.add.text(xMid, vh * .3, `Welcome to Nat Quest, ${gameManager.playerName}!
      \nYou have chosen the ${gameManager.selectedCharacter} as your character. \nIt's time to start your adventure!`, {
      fontSize: '24px',
      fontFamily: 'Roboto, sans-serif',
      fill: '#0d1117',
      align: 'center',
    })
      .setOrigin(0.5);


  }
}

window.WelcomePlayer = WelcomePlayer;
