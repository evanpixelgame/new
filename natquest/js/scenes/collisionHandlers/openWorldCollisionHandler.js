// If a sensor is supposed to be more of an overlap property rather than just an on collision
// Then make sure to give it a on collisionend switch case that reverses the effect after the collisionstart

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
              console.log('cue sirens, +2 speed');
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
  
//****************************************************************************************************************************************
//********************************COLLISION END SWITCH CASES******************************************************************************
  
  player.scene.matter.world.on('collisionend', (eventData) => {
    eventData.pairs.forEach(pair => {
      if (pair.bodyA === player.body || pair.bodyB === player.body) {
        const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
        const isCustom = otherBody.isSensor == true;
          
        if (isCustom) {
          switch (otherBody.customID) {
              
            case 'fastZone':
              console.log('whee woo, collision overlap over, -2 speed');
              scene.player.velocityChange -= 2; 
              break;
              
            // Add more cases for other sensor names as needed
            default:
              console.log('Ended collision with ' + otherBody.customID);
              // Handle other sensor names
              break;
          }
        } else {
          console.log('Ended Collision detected with non-sensor object ID:', otherBody.id);
        }
      }
    });
  });
    
}
