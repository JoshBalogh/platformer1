import { Enemy } from '../objects/Enemy.js';
import { Player } from '../objects/Player.js'

export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });

  }

  preload() {
    this.load.image('background', 'image/background1.png')
    this.load.atlas('playerIdle', 'image/playerIdleSheet.png', 'image/playerIdleSprites.json')
    this.load.atlas('SlimeAnims', 'image/Slimespritesheet.png', 'image/Slimesprites.json')
  }

  addPlatform(x, y, wd, ht){
    const platform = this.add.rectangle(x, y, wd, ht, 0x228B22)
    this.physics.add.existing(platform)
    platform.body.setAllowGravity(false)
    platform.body.setImmovable(true)
    this.platforms.push(platform)
  }

  create() {
    // this runs once when the scene is created
    // initialize variables and create object here

    

    // creating animations
    this.anims.create({ key: 'Idling', frames: this.anims.generateFrameNames('playerIdle', {prefix: 'idle', end: 2, zeroPad: 2}), frameRate:5, repeat: -1});

    this.anims.create({ key : 'slimeMove', frames: this.anims.generateFrameNames('SlimeAnims', {prefix: 'move', end: 7, zeroPad: 2}), frameRate:5 , repeat: -1})
    this.anims.create({ key : 'slimeIdle', frames: this.anims.generateFrameNames('SlimeAnims', {prefix: 'move', end: 0 , zeroPad: 2}), frameRate:5 , repeat: 0})
    this.anims.create({ key: 'slimeAttack', frames: this.anims.generateFrameNames('SlimeAnims', {prefix: 'attack', end: 7, zeroPad: 2}), frameRate: 5, repeat: 0})
 
    // create colliders after all objects exist
    this.group = this.physics.add.group({
          collideWorldBounds: true,
          originX: 1,
          originY: 1
    })

    // for background make it setGravity(false) && setImmovable(true) 
    this.background = this.group.create(0, 0, 'background')
    
    this.platforms = []
    this.enemies = []

    this.newbie = new Player(this, 50, 600)
    
    this.mySlime = new Enemy(this, this.newbie, 505, 600, 25)
    
    this.enemies.push(this.mySlime)

    // stuff for camera and world bounds
    this.physics.world.bounds.width = 1600
    this.physics.world.bounds.height = 600
    this.cameras.main.setBounds(0, 0, 1600, 600)
    this.cameras.main.startFollow(this.newbie)

    this.nextScene = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)
    
   
    this.createColliders();
  }

  update(timestamp, delta) {
      // this runs every frame
      // delta can be used to determine the number of milliseconds since the last update
      /*when player is over certian point and presses B enters the dungeon 
      is there a function for when player is around this area | thought of doing a collider for this
      */

    // sees if players past certain point, adds text, then players able to press N to go to next dungeon
    if(this.newbie.x >= 1500){
      this.add.text(1400, 200, 'press N to go on ')
      if(this.nextScene.isDown){
        this.scene.start('dungeon-one')
      }
    }
  }

  createColliders() {
      this.physics.add.collider(
        this.newbie,
        this.enemies,
        this.gameOver,
        null,
        this
      )

      this.physics.add.overlap(
        this.newbie.spear, 
        this.enemies, 
        (n,e)=>{
          if(n.getData(`canHit`) && n.getData(`spearAttack`)) {
            e.takeHit(5)
              console.log(e.hp)
            n.setData(`canHit`, false)
          }
        },
        null,
        this
      )
      
      this.physics.add.collider(
        this.newbie, 
        this.platforms
      )
  }
  gameOver(n,e){
    //this.scene.start('game-over')

    // if(this.newbie.x > this.enemies.x){
    //   this.newbie.body.setBounce(200)
    // }else{
    // }
    
    // using velocity it tries to override it which you cant 
    // using bounce doesn't work it only bounces on the Y axis and i couldnt get it to turn off
    // have to think of a way to either override velocity or just change it somehow ??? idk

    //this.newbie.body.setBounce(1)
    //this.newbie.body.setBounce(-2000,0)
  }


}
