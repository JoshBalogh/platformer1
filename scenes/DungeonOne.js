import { Player } from '../objects/Player.js'
export class DungeonOne extends Phaser.Scene {
    constructor() {
        super({ key: 'dungeon-one'})
    }
    preload(){
        this.load.image('lvl1Background', 'image/lvl1Background.png')
        this.load.atlas('PlayerAnims', 'image/Player_spritesheet.png', 'image/Player_sprites.json')
    }

    addPlatform(x, y, wd, ht){
        const platform = this.add.rectangle(x, y, wd, ht, 0xff0000)
        this.physics.add.existing(platform)
        platform.body.setAllowGravity(false)
        platform.body.setImmovable(true) 
        this.platforms.push(platform)
    }

    create(){
        this.lvl1Background = this.add.image(0, 0, 'lvl1Background')

        this.anims.create({ key: 'Idling', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'idle', end: 2, zeroPad: 2}), frameRate:5, repeat: -1});
        this.anims.create({ key: 'Running', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'run', end: 2, zeroPad: 2}), frameRate:5, repeat: -1});
        this.anims.create({ key: 'StanceForm', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'stance', end: 0, zeroPad: 2}), frameRate:5, repeat: 0});
        this.anims.create({ key: 'Jumping', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'jump', end: 2, zeroPad: 2}), frameRate:15, repeat: 0});
        this.anims.create({ key: 'Crouching', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'crouch', end: 0, zeroPad: 2}), frameRate:5, repeat: -1});
        this.anims.create({ key: 'Stabbing', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'stab', end: 2, zeroPad: 2}), frameRate:25, repeat: 0});
        this.anims.create({ key: 'Slashing', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'slash', end: 3, zeroPad: 2}), frameRate:25, repeat: 0});
        this.anims.create({ key: 'GotHit', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'hit', end: 2, zeroPad: 2}), frameRate:5, repeat: 0});

        this.platforms = []
        //this.platforms(300,300,20,200) | dont know how to add platforms

        this.newbie = new Player(this, 50, 600)
        
        // stuff for camera and world bounds
        this.physics.world.bounds.width = 3500
        this.physics.world.bounds.height = 2400
        //this.cameras.main.setBounds(0, 0, 1600, 600)
        this.cameras.main.startFollow(this.newbie)

        this.lvl1Background.setOrigin(.0000001)
    }
}