import { Enemy } from '../objects/Enemy.js';
import { Player } from '../objects/Player.js'

export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });
  }

  preload() {
    this.load.image('background', 'image/background1.png')
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

    // create colliders after all objects exist
    this.group = this.physics.add.group({
          collideWorldBounds: true,
          originX: 1,
          originY: 1
    })
    this.background = this.group.create(0, 0, 'background')
    //for background make it setGravity(false) && setImmovable(true) 

    this.platforms = []
    this.enemies = []

    this.newbie = new Player(this, 50, 600)
    this.goblin1 = new Enemy(this, this.newbie,{ x:505, y:600, wd: 60, ht: 70, color: 0x111111, hp:5})
    
    this.enemies.push(this.goblin1)
    

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
    
    //if player is at x && presses (next button) === next scene
    //can i have it to x 1500-1600?
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
          console.log('worked') //inline method
          if(this.newbie.spearAttack) e.takeHit(5)
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
