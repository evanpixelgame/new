//Creates collision objects, sensor objects, and covers handling of the sensor object interactions with player
//Import as needed into scenes that have 2.5D maps that require collision/sensor object creation and handling
//Make sure that all imported maps have their Object layer that deals with collisions is named "Collision Layer 1"
//Also ensure their Object layer that deals with sensors is named "Sensor Layer 1" and when adding custom properties in Tiled editor, do "customID" for property and then give it a value of whatever label will coorelate with its caused effect 

// TRY TO ADD A IF LOGIC TO IT SO THAT IT CAN USE OBJECT PROPERTIES TO DETERMINE WHETHER TO HANDLE THE SENSOR AS ON COLLISION OR OVERLAP
//expirment with different ways to initiate the callback other than collisionStart and overlap, learn how to use overlap better
//maybe split up the sensor handling if the switch cases start to get excessive, maybe each scene can get their own sensorhandler if it starts getting excession
//^^and then this file could just for senor and collision object creation, and then each scene would get its own collision handler function.
//^^maybe keep the main logic for the sensor handling here and then have the individual sensorhandler file for each scene just handle the different switch cases
import NewScene from '../scenes/NewScene.js';
import OpenWorld from '../scenes/OpenWorld.js';

export function sensorHandler(scene, map, player, transitionSensors) {

  player.scene.matter.world.on('collisionstart', (eventData) => {
    // Loop through pairs of colliding bodies
    eventData.pairs.forEach(pair => {
      // Check if the player is one of the bodies involved in the collision
      if (pair.bodyA === player.body || pair.bodyB === player.body) {
        // Get the other body involved in the collision
        const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
        // const isCustom = otherBody.properties.find(prop => prop.name === 'customID') !== undefined;
        const isCustom = otherBody.isSensor == true;

        if (isCustom) {
          switch (otherBody.customID) {

            case 'OpenWorldToInsideRoom':
              console.log('You hit a transition sensor!');
              // Perform actions specific to this sensor
              console.log('youve hit the sensor by the door the first time');
             let sceneAlreadyStarted = false;
            //set the player position in OpenWorld to a position not touching sensor before pausing and switching scenes
             console.log('TITI is beautiful player position before' + scene.player.x + 'and' + scene.player.y );
              scene.player.x = 560;
              scene.player.y = 800;
              console.log('TITI is beautiful player position after' + scene.player.x + 'and' + scene.player.y );
              //this.scene.get('OpenWorld').player.y = 800;
              scene.scene.pause('OpenWorld');
              scene.scene.add('NewScene', NewScene);
              scene.scene.start('NewScene', {
                player: scene.player,
                speed: scene.speed,
                camera: scene.cameras.main,
                controls: scene.controls, // Passing the controls object here
                engine: scene.matter.world,
                world: scene.world,
              });
              break;

            case 'fastZone':
              console.log('cue sirens, double speed');
              //   scene.speed /= 2;
              //player.setVelocity(player.velocity.x * 2, player.velocity.y * 2);
              Matter.Body.setVelocity(scene.player.body, { x: scene.player.body.velocity.x * 2, y: scene.player.body.velocity.y });
              break;

            case 'BackToOpenWorld':
              console.log('take me back home daddy');
     //   scene.scene.pause('NewScene'); // Stop or pause, depending on your needs
        scene.scene.resume('OpenWorld', {
                player: scene.player,
                speed: scene.speed,
                camera: scene.cameras.main,
                controls: scene.controls, // Passing the controls object here
                engine: scene.matter.world,
                world: scene.world,
              //newPosition: newPosition,
              });
        scene.scene.pause('NewScene');
              break;


            case 'InsideRoomToNextRoom':
              console.log('take me back home again daddy');
              //   const newPosition = { x: 560, y: 715 };
              //  scene.scene.remove('ComputerControls');
             // scene.scene.add('NextRoom', NextRoom);
              scene.scene.start('NextRoom', {
                player: scene.player,
                speed: scene.speed,
                //     camera: scene.cameras.main,
                controls: scene.controls, // Passing the controls object here
                //  engine: scene.matter.world,
                //    world: scene.world,
                //newPosition: newPosition,
              });
              break;

            // Add more cases for other sensor names as needed
            default:
              console.log(otherBody.customID);
              // Handle other sensor names
              break;
          }
        } else {
          console.log('Collision detected with non-sensor object ID:', otherBody.id);
        }
      }
    });
  });
}
