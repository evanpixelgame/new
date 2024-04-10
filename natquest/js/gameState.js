export class GameManager {
  constructor() {
    this.selectedCharacter = null;
    this.selectedCharacterIndex = null;
    this.playerName = '';
    this.health = 100;
    this.stamina = 100;

    this.sensorID = {};
  }
}

export const gameManager = new GameManager();
