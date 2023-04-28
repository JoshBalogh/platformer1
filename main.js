import { StartMenu } from './scenes/StartMenu.js';
import { MainLevel } from './scenes/MainLevel.js';
import { GameOver } from './scenes/GameOver.js';
import { InfoTab } from './scenes/InfoTab.js';
import { DungeonOne } from './scenes/DungeonOne.js'

let config = {
    type: Phaser.AUTO, 
  //  pixelArt: true, | dont know what this does it was a scaling test
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
      StartMenu, GameOver, MainLevel, InfoTab, DungeonOne
    ]
};

let game = new Phaser.Game(config);