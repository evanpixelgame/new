class Settings extends Phaser.Scene {
  constructor() {
    super({ key: 'Settings' });
  }

  
  preload() {
    
  }

  create() {

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

     const backButton = this.add.text(xMid, vh * .8, 'Back', {
      fontSize: '48px', 
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

    
    // Set a callback function for the button click event
    backButton.on('pointerdown', function () {
      this.scene.start('StartMenu');
    }, this);


    // Declaration and initialization of welcomeTextBlock
    const welcomeTextBlock = this.add.text(xMid, vh * .3, `Currently only Fullscreen setting functional\nMore settings to come soon!
      \nThanks for your patience :)`, {
      fontSize: '24px',
      fontFamily: 'Roboto, sans-serif',
      fill: '#0d1117',
      align: 'center',
    })
      .setOrigin(0.5);

    
  }
}

window.Settings = Settings;


/*
add settings options here 

background music volume
Noise/sound effects volume
Accessibility Controls
    -screen reader
    -additional magnification
    
-UI interface size
-Text font size
-maybe get into fun specifics like color themes, font choices, other stylistic things

-Location where to save local files/browser files if browser saves need a location which they may not 
*/
