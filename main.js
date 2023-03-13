import { StartMenu } from './scenes/StartMenu.js';
import { MainLevel } from './scenes/MainLevel.js';
import { GameOver } from './scenes/GameOver.js';
import { InfoTab } from './scenes/InfoTab.js'

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 600,
    input: {
        gamepad: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            fps: 60,
            gravity: { y: 600}
        }
    },
    scene: [ 
      StartMenu, GameOver, MainLevel, InfoTab
    ]
};

let game = new Phaser.Game(config);