//This acts as a global state manager. This file is globally accessible
//any data that needs to be persistant across scenes/states can be saved here
//by storing it in the GameManager class object, it can be accessed and modified anywhere
//things can be set and retrieved from GameManager class object from any file in this format:
// ex. GameManager.health -= 5; or GameManager.inventory.potions.healthpotionMax += 3; 
// (in first ex if you lost 5 health or second ex if you bought 3 more potions)

//export class GameManager {
class GameManager {
  constructor() {
    this.selectedCharacter = null;
    this.selectedCharacterIndex = null;
    this.playerName = '';
    this.health = 100;
    this.stamina = 100;

    this.sensorID = {};
  }
}

const gameManager = new GameManager();
