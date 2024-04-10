import { NameSelect } from "./NameSelect.js";
import { Settings } from "./Settings.js";
import { WelcomePlayer } from "./WelcomePlayer.js"; //get rid of this eventually when testing is done and scene order is normal

export class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'StartMenu' });
    this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
  }

  preload() {

  }

  create() {

    const vw = window.innerWidth;
    const xMid = vw * .5;
    const vh = window.innerHeight;


    // Add background image
    const background = this.add.image(xMid, vh * .8, 'background');//////////was vh * .8/////////////////////////////////////
    background.setOrigin(0.5);

    // Add selection menu container
    const backdrop = this.add.graphics();
    backdrop.fillStyle(0xE6E6FA, .7);
    backdrop.lineStyle(4, 0x000000, 1);
    backdrop.fillRect(vw / 9, vh / 8, vw / 6, 300);/////////////////////////////////////////////


    // Add a title
    const title = this.add.text(xMid, vh / 2, 'NAT QUEST', {//////////////////////////////////////////////
      fontSize: '72px',
      fontFamily: 'Knewave',
      fill: '#ba76d2',
      stroke: '#fce5a1', // Stroke color
      strokeThickness: 6,
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5);

    // Set up a scaling animation for the title
    this.tweens.add({
      targets: title,
      scaleX: 1.2,  // Scale up by 20%
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,  // Scale back to the original size
      repeat: -1,  // Infinite loop
    });

    // Add a start button
    const startButton = this.add.text(vw / 5, vh / 5, 'Start', { ////////////////////////////////////////////////////////
      fontSize: '26px',
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();

    // Add a settings button
    const settingsButton = this.add.text(vw / 5, vh / 5 + 50, 'Settings', {///////////////////////////////////////////////////////////
      fontSize: '26px',
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();
    // ^^ make interactable later with a Settings page with the proper UI
    // also include an audio on/off toggle in top right when audio is added
    //eventually also have a Load Game option when i figure out how to use browser local storage to create saves
    //should also make a save option that lets people save their file to their local pc/device
    //so that they can continue their game without fear of it being solely held in a browser that might get wiped

    // Add a fullscreen button
    const fullscreenButton = this.add.text(vw / 5, vh / 5 + 100, 'Fullscreen', {///////////////////////////////////////////////////////////////
      fontSize: '26px',
      fontFamily: 'knewave',
      fill: '#c92b23',
      padding: { x: 20, y: 20 },
    })
      .setOrigin(0.5)
      .setInteractive();


    if (this.isMobileDevice() && this.isPortraitMode()) {
      // Add some text to the backdrop
      const instructionText = this.add.text(xMid, 2 * vh / 3,///////////////////////////////////////////////////////////////////////////
        'Please set your\nmobile device\nto landscape mode\nto continue', {
        fontSize: '36px',
        fontFamily: 'knewave',
        fill: '#c92b23',
        stroke: '#ba76d2',
        strokeThickness: 6,
        fontWeight: 'bold',
        align: 'center',
      })
        .setOrigin(0.5);
    }

    // Set a callback function for the button click event
    startButton.on('pointerdown', function () {
      const orientation = window.screen.orientation.type;
      // Check if the device is in landscape mode
      // Execute event handler code only in landscape mode
      console.log('Click event in landscape mode');
      window.removeEventListener('orientationchange', this.handleResizeOnReorientation);
      //  this.lockScreenOrientation();
       this.scene.add('WelcomePlayer', WelcomePlayer);
      this.scene.start('WelcomePlayer');
      // Transition to the main scene when the button is clicked
    }, this);

    fullscreenButton.on('pointerdown', () => {
      if (this.isFullScreen()) {
        this.exitFullScreen();
      } else {
        this.requestFullScreen();
      }
    });


    settingsButton.on('pointerdown', () => {
      this.scene.start('Settings');
    });

    // **************************************************************************EVENT LISTENERS BELOW *****************************************************************
    //this.scale.on('fullscreenchange', this.handleFullscreenChange, this);
    this.scale.on('resize', this.handleFullscreenChange, this);//this.resizeGame, this);
    window.addEventListener('orientationchange', this.handleResizeOnReorientation);
    //   window.addEventListener('resize', this.handleResizeOnReorientation);

  }

  handleResizeOnReorientation() {
    location.reload();
  }

  isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  // Check if the device is in portrait mode
  isPortraitMode() {
    return window.innerHeight > window.innerWidth;
  }


  requestFullScreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  }

  handleFullscreenChange() {

    if (this.scale.isFullscreen) {

      this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
    } else {

      this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
    }
  }

  resizeGame(gameSize) {

    const { width, height } = gameSize;

    // Resize the game canvas
    this.sys.game.canvas.style.width = width + 'px';
    this.sys.game.canvas.style.height = height + 'px';

    // Resize the game config to match the new size
    this.sys.game.config.width = width;
    this.sys.game.config.height = height;

    // Call resize events on all scenes
    this.events.emit('resize', gameSize);
  }

  isFullScreen() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  lockScreenOrientation() {
    if (screen.orientation.lock) {
      screen.orientation.lock('landscape');
    } else if (screen.lockOrientation) {
      screen.lockOrientation('landscape');
    } else if (screen.mozLockOrientation) {
      screen.mozLockOrientation('landscape');
    } else if (screen.msLockOrientation) {
      screen.msLockOrientation('landscape');
    } else {
      console.log('Screen orientation locking not supported.');
    }
  }



}

window.StartMenu = StartMenu;
