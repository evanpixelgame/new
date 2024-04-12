// Creates collision objects, sensor objects, and covers handling of the sensor object interactions with player
// Import as needed into scenes that have 2.5D maps that require collision/sensor object creation and handling
// Make sure that all imported maps have their Object layer that deals with colliding with barriers/walls is named "Collision Layer 1"
// MKW sure all imported maps have their Object layer that deals with collisions with custom sensors is named "Sensor Layer 1"
// Make sure all custom objects in the Tiled 'Sensor Layer 1' object layer have custom property names
// Make sure those custom property names are either: customCollsionID, customOverlapID, customClickID
// Make sure the values of the custom property names are descriptive and able to be used easily for switch cases

// INSTRUCTIONS FOR HOW TO CREATED A TILED MAP OBJECT LAYER THAT WORKS WITH THIS CODE:
//******************************************************************************************
// In Tiled map editing software, make a new orthogonal map, choose to embed Tilesets
// For collision objects, create an object layer named 'Collision Layer 1' and create your collision object shapes
// Collision objects on 'Collision Layer 1' do not need custom property names, as all objects on that layer are treated as collisions
// For sensor objects, create an object layer named 'Sensor Layer 1' and create your sensor object shapes
// Click on properties of object shapes, click add properties
// If the shape is for a sensor that works with on collision event, click on object and see expanded info
// Add custom property to shape. Give the custom propety a name of customCollisionID
// Then give customCollisionID a value of a descriptive, unique title ie. OpenWorldToInsideRoom
// Sometimes the objects can have the same ID for the same effect
// ie. multiple objects could have property name customCollisionID with a descriptive value, ex. 'TakeFiveDamage'
// Now any tile with that label will do the same thing based on the handler switch case
// If the sensor is supposed to activate based on an Overlap event
// Then give it a custom property name of customOverlapID with a descriptive value, ex. 'IceTerrain' to affect friction during overlap
// If the sensor is supposed to activate based on a Click event
// Then give it a custom property name of customClickID with a descriptive value, ex. 'TalkToSadGhost' to initiate dialogue with NPC
// custom property name options: customCollsionID, customOverlapID, customClickID

export function sensorMapSet(scene, map) {
  const sensorLayer1 = map.getObjectLayer('Sensor Layer 1');

  sensorLayer1.objects.forEach(object => {
    // Log object properties to check if it has the customID property
    const customIDProperty = object.properties.find(prop => prop.name === 'customID');
    const customID = customIDProperty ? customIDProperty.value : null;
    console.log('Object Custom IDfromhandler:', customID);

    const customCollisionIDProperty = object.properties.find(prop => prop.name === 'customCollisionID');
    const customCollisionID = customCollisionIDProperty ? customCollisionIDProperty.value : null;
    if (customCollisionID) {
    console.log('Object CustomCollision IDfromhandler:', customCollisionID);
    }
    
    const customOverlapIDProperty = object.properties.find(prop => prop.name === 'customOverlapID');
    const customOverlapID = customOverlapIDProperty ? customOverlapIDProperty.value : null;
    if (customCollisionID) {
    console.log('Object CustomOverlap IDfromhandler:', customOverlapID);
    }

    if (customCollisionID) {
    const customClickIDProperty = object.properties.find(prop => prop.name === 'customClickID');
    const customClickID = customClickIDProperty ? customClickIDProperty.value : null;
    console.log('Object CustomClick IDfromhandler:', customClickID);
    }
      
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;
    const width = object.width;
    const height = object.height;

    // Create the rectangle sensor body
    const sensor = scene.matter.add.rectangle(centerX, centerY, width, height, {
      isSensor: true, // Set to true to make it a sensor
      customID: customID,
      customCollisionID: customCollisionID,
      customOverlapID: customOverlapID,
      render: {
        fillStyle: 'transparent', // Optional: make the sensor invisible
        strokeStyle: 'red' // Optional: set a stroke color for debugging
      }
    });
  });

}



export function createCollisionObjects(scene, map) {
  const collisionObjects = [];

  const objectLayer = map.getObjectLayer('Collision Layer 1');

  objectLayer.objects.forEach(object => {
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;

    if (object.polygon) {
      // Handle polygons
      const polygonVertices = object.polygon.map(vertex => {
        return { x: object.x + vertex.x, y: object.y + vertex.y };
      });

      // Adjust the centroid of the polygon
      const centroid = calculateCentroid(polygonVertices);
      const adjustedVertices = polygonVertices.map(vertex => {
        return {
          x: vertex.x - centroid.x + centerX,
          y: vertex.y - centroid.y + centerY
        };
      });

      const collisionObject = scene.matter.add.fromVertices(centerX, centerY, adjustedVertices, { isStatic: true });
      collisionObjects.push(collisionObject);
    } else if (object.ellipse) {
      // Handle circles
      const radiusX = object.width / 2;
      const radiusY = object.height / 2;
      const collisionObject = scene.matter.add.circle(centerX, centerY, Math.max(radiusX, radiusY), { isStatic: true });
      collisionObjects.push(collisionObject);
    } else {
      // Handle rectangles
      const collisionObject = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
      collisionObjects.push(collisionObject);
    }
  });

  return collisionObjects;
}


// Function to calculate centroid of a polygon
function calculateCentroid(vertices) {
  let centroidX = 0;
  let centroidY = 0;
  const vertexCount = vertices.length;

  for (let i = 0; i < vertexCount; i++) {
    const vertex = vertices[i];
    centroidX += vertex.x;
    centroidY += vertex.y;
  }

  centroidX /= vertexCount;
  centroidY /= vertexCount;

  return { x: centroidX, y: centroidY };
}
