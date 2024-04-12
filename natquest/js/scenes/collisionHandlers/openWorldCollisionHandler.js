    //  customID: customID,
    //  customCollisionID: customCollisionID,
    //  customOverlapID: customOverlapID,
    //  customClickID: customClickID,
//  ^^^^ current options for IDs that hold ID values ie. customOverlapID: FastZone

// TRY TO ADD A IF LOGIC TO IT SO THAT IT CAN USE OBJECT PROPERTIES TO DETERMINE WHETHER TO HANDLE THE SENSOR AS ON COLLISION OR OVERLAP
//expirment with different ways to initiate the callback other than collisionStart and overlap, learn how to use overlap better
//maybe split up the sensor handling if the switch cases start to get excessive, maybe each scene can get their own sensorhandler if it starts getting excession
//^^and then this file could just for senor and collision object creation, and then each scene would get its own collision handler function.
//^^maybe keep the main logic for the sensor handling here and then have the individual sensorhandler file for each scene just handle the different switch cases

//in the setter, add another property called overlapSensor and set that to true based on a similar customID principle used to set the customIDs
//or maybe assign contact sensors a customID property that says that and overlap sensors a customID with overlap and set isOverlap from false to true
//and set is oncontact false from true, and then do a if logic before the switch cases, so there will overlap switchs and contact switches

import NewScene from '../scenes/NewScene.js';
import OpenWorld from '../scenes/OpenWorld.js';
import PlayerControls from '../PlayerControls.js';

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
        // const isCustomCollision //SWITCH TO THESE SO THAT IT CAN TAKE DIFFERENT TYPES OF SENSORS FOR DIFFERENT REACTIONS AND DO ANOTHER ONE FOR ON
        // const isCustomOverlap  // OVERLAP AND SEE IF THERE ARE OTHER COLLISION EVENT LISTENER TYPES AND ACCOMODATE THEM

        if (isCustom) {

            console.log('TITISO PRETTY, otherbody.customID' + otherBody.customID || ' orCaseSuckas');
            console.log('TITISO PRETTY, otherbody.customCollisionID' + otherBody.customCollisionID || ' orCaseSuckas');
          switch (otherBody.customID) {
              
           case 'OpenWorldToInsideRoom':
    // Check if 'NewScene' is already active
    const newScene = scene.scene.get('NewScene');
    if (scene.NewSceneLaunched == true) {
      console.log('You hit the door sensor again!');
        // If 'NewScene' is already active, resume it
        scene.scene.pause('OpenWorld');
        scene.scene.pause('PlayerControls');
        scene.scene.resume('NewScene');
        scene.scene.bringToTop('NewScene'); 
    } else {
      console.log('youve hit the door sensor for the first time');
      console.log('x position: ' + scene.player.x + '  y position: ' + scene.player.y);
      scene.player.setPosition(560, 685);
      console.log('x position: ' + scene.player.x + '  y position: ' + scene.player.y);
       
      scene.NewSceneLaunched = true;
      // If 'NewScene' is not active, launch it
        scene.scene.pause('OpenWorld');
       scene.scene.add('NewScene', NewScene);
        scene.scene.launch('NewScene', {
            player: scene.player,
            engine: scene.matter.world,
            world: scene.world,
        });
    }
    break;
              
            case 'BackToOpenWorld':
       console.log('take me back home daddy');
        scene.player.setPosition(850, 790);
       scene.scene.pause('NewScene');
     // scene.scene.remove('PlayerControls');  //JSUT CHANGED THIS
               scene.scene.pause('PlayerControls');
       scene.scene.resume('OpenWorld', { sourceScene: 'NewScene' });
       scene.scene.bringToTop('OpenWorld'); //instead of bringingopenworld to top, maybe setting visibility to 0? also maybe pause and resume would work with controls if player is passed continueously?
              break;
              

            case 'fastZone':
              console.log('cue sirens, double speed');
              //   scene.speed /= 2;
              //player.setVelocity(player.velocity.x * 2, player.velocity.y * 2);
            //  Matter.Body.setVelocity(scene.player.body, { x: scene.player.body.velocity.x * 2, y: scene.player.body.velocity.y });
                scene.player.velocityChange += 2; 
              break;

            case 'InsideRoomToNextRoom':
              console.log('take me back home again daddy');
              scene.scene.start('NextRoom', {
                player: scene.player,
                speed: scene.speed,
                controls: scene.controls, // Passing the controls object here
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
