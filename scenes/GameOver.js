export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "game-over" });
  }

  preload() {
    console.log('game over chooms')
  }

  create() {
    this.add.text(100, 100, "Game Over!");
    this.startScene = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  update() {
    if(this.startScene.isDown){
      this.scene.start('dungeon-one')
    }
  }
}
