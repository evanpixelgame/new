import { PlayerSprite } from '../PlayerSprite.js';
import { sensorMapSet, createCollisionObjects } from '../collisionHandlers/mapSetter.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';

export default class NewScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NewScene' });

    this.map = null;
    this.player = null;
    this.collisionObjects = null;
    this.transitionSensors = null;
    this.engine = null;
    this.world = null;
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    this.player = data.player;
    console.log('Player received in NewScene:', this.player);
  }

  preload() {
  }

  create() {
    // Use the existing Matter.js engine and world from the OpenWorld scene
    this.engine = this.scene.get('OpenWorld').engine;
    this.world = this.scene.get('OpenWorld').world;

    // Get the reference to the already launched CompUI scene
    const gameUIScene = this.scene.get('GameUI');

    // If the CompUI scene exists, update its gameScene property
    if (gameUIScene) {
      gameUIScene.gameScene = this;
    }

    // Create the map
    const map = this.make.tilemap({ key: 'insidemap' });
    // Load tilesets and create layers

    const tilesetsData = [
      { name: 'tilesheetInterior', key: 'tilesheetInterior' },
      { name: 'tilesheetWalls', key: 'tilesheetWalls' },
      { name: 'tilesheetObjects', key: 'tilesheetObjects' },
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
      tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
      layers.push(map.createLayer(i, tilesets, 0, 0));
    }

    this.player = new PlayerSprite(this, 850, 790, 'player'); //any values that should be carried over should be saved to GameManager and then accessed through parameters ie. new PlayerSprite(this, data.player.x, data.player.y, 'player');
    console.log(this.player);
    this.player.setScale(1);

    this.scene.launch('PlayerControls', { player: this.player });


    // Set world bounds for the player
    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
      boundaryOffset,
      boundaryOffset,
      map.widthInPixels - 2 * boundaryOffset,
      map.heightInPixels - 2 * boundaryOffset
    );

    // Set up collision objects and sensor mapping
    this.collisionObjects = createCollisionObjects(this, map);
    this.sensorMapping = sensorMapSet(this, map, this.sensorID);
    this.sensorHandling = sensorHandler(this, map, this.player);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    //  this.cameras.main.setZoom(2);

                this.events.on('resume', () => {
            console.log('NewScene has been resumed!');
 //   this.scene.add('./PlayerControls.js', PlayerControls);
    this.scene.launch('PlayerControls', { player: this.player });
        });
  }

  update(time, delta) {
    // Update logic for the scene, if necessary
  }
}
