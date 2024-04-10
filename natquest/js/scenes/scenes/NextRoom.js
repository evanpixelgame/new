import { PlayerSprite } from '../PlayerSprite.js';
import { sensorMapSet, createCollisionObjects } from '../collisionHandlers/mapSetter.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';

export default class NextRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'NextRoom' });
  }


  init(data) {
    this.controls = data.controls || null;
    this.engine = data.engine || null;
    // Check if the necessary data is provided
    // Check if the necessary data is provided
    if (!data || !data.player || !data.speed || !data.camera || !data.controls || !data.engine || !data.world) {
      let missingData = [];
      if (!data) {
        missingData.push("data");
      } else {
        if (!data.player) missingData.push("player");
        if (!data.speed) missingData.push("speed");
        if (!data.camera) missingData.push("camera");
        if (!data.controls) missingData.push("controls");
        if (!data.engine) missingData.push("engine");
        if (!data.world) missingData.push("world");
      }
      console.error("Missing required data for InsideRoom scene initialization: " + missingData.join(", "));
      return;
    }


    // Initialize properties
    this.player = data.player;
    this.speed = 2;
    this.camera = data.camera;
    this.controls = data.controls;
    this.engine = data.engine;
    this.world = data.world;

    // Debugging: Log initialized properties
    console.log("NextRoom initialized with:", {
      player: this.player,
      speed: this.speed,
      camera: this.camera,
      controls: this.controls,
      engine: this.engine,
      world: this.world
    });

    // Check if the necessary data is provided
    if (!data || !data.player || !data.speed || !data.camera || !data.controls || !data.engine || !data.world) {
      let missingData = [];
      if (!data) {
        missingData.push("data");
      } else {
        if (!data.player) missingData.push("player");
        if (!data.speed) missingData.push("speed");
        if (!data.camera) missingData.push("camera");
        if (!data.controls) missingData.push("controls");
        if (!data.engine) missingData.push("engine");
        if (!data.world) missingData.push("world");
      }
      console.error("Missing required data for InsideRoom scene initialization: " + missingData.join(", "));
      return;
    }

  }

  preload() {
    // Preload assets if needed
  }

  create() {

    // Create the new map using the loaded tilemap
    const map = this.make.tilemap({ key: 'nextroommap' });


    // Load tileset
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
    this.speed = 2;
    // Initialize player sprite
    this.player = new PlayerSprite(this, 970, 664, 'player');

    this.player.setScale(1);

    //   this.scene.add('ComputerControls', ComputerControls); // Add ComputerControls scene
    //    this.controls = this.scene.get('ComputerControls'); // Retrieve controls scene
    //   this.scene.launch('ComputerControls', { player: this.player, speed: this.speed }); // Launch ComputerControls scene


    // Set world bounds for the player
    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
      boundaryOffset,
      boundaryOffset,
      map.widthInPixels - 2 * boundaryOffset,
      map.heightInPixels - 2 * boundaryOffset
    );
    // this.world.setBounds(0, 0, worldBounds.width, worldBounds.height);

    this.collisionObjects = createCollisionObjects(this, map);
    this.sensorMapping = sensorMapSet(this, map, this.sensorID);
    this.sensorHandling = sensorHandler(this, map, this.player);


    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    console.log("NextRoom end of create func status with:", {
      player: this.player,
      speed: this.speed,
      camera: this.camera,
      controls: this.controls,
      engine: this.engine,
      world: this.world
    });
  }

  update(time, delta) {
  }
}

window.NextRoom = NextRoom;
