//The main.js is like the control hub for the Phaser 3 game
//This is where game intialization information is held
//Scene order also matters to a degree, for example, GameUI is always listed as last scene
//This makes sure GameUi is always the foremost item & not hidden beneath other elements

//import PlayerControls from './scenes/PlayerControls.js';
//import OpenWorld from  "./scenes/scenes/OpenWorld.js";
//import NewScene from './scenes/scenes/NewScene.js';
//import InsideRoom from './scenes/scenes/InsideRoom.js';
//import NextRoom from './scenes/scenes/NextRoom.js';
    import { Preloader } from "./scenes/gameStartScenes/Preloader.js";
 //  import { StartMenu } from "./scenes/gameStartScenes/StartMenu.js";
//  import { Settings } from    "./scenes/gameStartScenes/Settings.js";
 //  import { NameSelect } from    "./scenes/gameStartScenes/NameSelect.js";
//   import { CharSelect } from "./scenes/gameStartScenes/CharSelect.js";
//  import { WelcomePlayer } from  "./scenes/gameStartScenes/WelcomePlayer.js";
//   import { MobileControls } from "./scenes/MobileControls.js";
//   import { GameUI } from    "./scenes/GameUI.js";
//   import { PlayerAnimations } from "./scenes/PlayerAnimations.js";

//set the width and height of the canvas equal the width and height of the screen it's being played on
const width = window.innerWidth;
const height = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  backgroundColor: '#FDD5D5', //this is the pink "border" that is around the screen
  //it helps it maintain aspect ratio when resized, could be replaced with border image
  parent: 'game-container',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE, //this just makes it so that the game canvas always tries to automatically adjust so that it fills the available screen
  },
  physics: {
    default: "matter", //this sets the physics engine to use matter.js instead of arcade physics
    matter: { //here the defaults for the matter.js physics engine are set
      gravity: { y: 0 }, //since its a top down "2.5D" game, there is no inherent gravity. if certain scenes have sidescroller aspect or things need to fall "down", adjust the gravity as needed per scene
      debug: true,
    },
  },
  //list all the scenes needed for the game, list them in the order theyre needed, with CompUI last
  //all scenes don't need to be listed here, but they do need to either be listed here OR linked to from an existing scene that is here
  //ie. you could list StartMenu in the list of scenes below and have NameSelect scene listed here too OR you could you just list StartMenu and in StartMenu scene link it directly to NameSelect
  scene: [
    Preloader,
   // StartMenu,
//    Settings,
   // NameSelect,
 //   CharSelect,
//    WelcomePlayer,
 //   MobileControls,
 //   PlayerControls,
//    PlayerAnimations,
 //   OpenWorld,
 //   NewScene,
  //  InsideRoom,
  //  NextRoom,
 //   GameUI,
  ],
  interpolation: true,
};

const game = new Phaser.Game(config);
