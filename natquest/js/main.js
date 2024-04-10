import PlayerControls from './scenes/PlayerControls.js';
import NextRoom from './scenes/scenes/NextRoom.js'; 
import NewScene from './scenes/scenes/NewScene.js'; 
import NewScene from './scenes/scenes/InsideRoom.js'; 

const width = window.innerWidth;
const height = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  backgroundColor: '#FDD5D5',
  parent: 'game-container',
  pixelArt: true,
  scale: {
     mode: Phaser.Scale.RESIZE,
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [
    Preloader,
    StartMenu,
    Settings,
    NameSelect,
    CharSelect,
    WelcomePlayer,
    MobileControls,
    PlayerControls,
    PlayerAnimations,
    OpenWorld,
    NewScene,
    InsideRoom,
    NextRoom,
    CompUI,
  ],
   interpolation: true,
};

const game = new Phaser.Game(config);
