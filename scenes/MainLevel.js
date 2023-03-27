import { Enemy } from '../objects/Enemy.js';
import { Player } from '../objects/Player.js'

export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });
  }

  preload() {
    this.load.image('background', 'image/background1.png')
    this.load.atlas('playerIdle', 'image/playerIdleSheet.png', 'image/playerIdleSprites.json')
    this.load.atlas('slimeMove', 'image/slimeMovesheet.png', 'image/SlimeMovesprites.json')
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


    //creating animations
    this.anims.create({ key: 'Idling', frames: this.anims.generateFrameNames('playerIdle', {prefix: 'idle', end: 3, zeroPad: 2}), repeat: -1});
    this.anims.create({ key: 'Moving', frames: this.anims.generateFrameNames('slimeMove', {prefix: 'move', end: 8, zeroPad: 2}), repeat: -1});
    
    // create colliders after all objects exist
    this.group = this.physics.add.group({
          collideWorldBounds: true,
          originX: 1,
          originY: 1
    })
      //for background make it setGravity(false) && setImmovable(true) 
    this.background = this.group.create(0, 0, 'background')
    
    this.platforms = []
    this.enemies = []

    this.newbie = new Player(this, 50, 600)
    this.newbie.anims.play('Idling')

    this.goblin1 = new Enemy(this, this.newbie,{ x:505, y:600, wd: 60, ht: 70, color: 0x111111, hp:25})
    
    this.enemies.push(this.goblin1)

    //if slime detection = true then run 'Moving' animatin
    //if(){};
    

      //stuff for camera and world bounds
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
    if(this.nextScene.isDown && this.newbie.x === 1600){
      this.scene.start('dungeon-one')
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
              console.log(`${n.getData(`canHit`)} collider worked`) //inline method
          if(n.getData(`canHit`) && n.getData(`spearAttack`)) {
            e.takeHit(5)
              console.log(e.hp)
              console.log(`${n.getData(`canHit`)} in attack`)
            n.setData(`canHit`, false)
              console.log(`${this.newbie.spear.getData(`canHit`)} after attack (newbieSpear)`)
              console.log(`${n.getData(`canHit`)} after attack`)
          }
        },
        null,
        this
      )
      
      this.physics.add.collider(
        this.newbie, 
        this.platforms
      )
    


    // one per colliding pair
    // this.physics.add.collider(
    //   this.group1,
    //   this.group2,
    //   this.functionToHandleCollision,  // expects item from group1 and group2 that collided
    //   null,
    //   this
    // );

  }
  gameOver(n,e){
    this.scene.start('game-over')
  }


}
