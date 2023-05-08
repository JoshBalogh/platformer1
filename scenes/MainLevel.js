import { Enemy } from '../objects/Enemy.js';
import { Player } from '../objects/Player.js'
export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });
    this.textToDungeon = false
    this.text1 = false
  }

  preload() {
    this.load.image('background', 'image/background1.png')
    this.load.atlas('PlayerAnims', 'image/Player_spritesheet.png', 'image/Player_sprites.json')
    this.load.atlas('SlimeAnims', 'image/Slimespritesheet.png', 'image/Slimesprites.json')
    this.load.atlas('SpdSlimeAnims', 'image/SpdSlimeSpritesheet.png', 'image/SpdSlimeSprites.json')
    this.load.atlas('bruteSlimeAnims', 'image/bruteSpriteSheet.png', 'image/bruteSprites.json')
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

    // creating animations for player
    this.anims.create({ key: 'Idling', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'idle', end: 2, zeroPad: 2}), frameRate:5, repeat: -1});
    this.anims.create({ key: 'Running', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'run', end: 2, zeroPad: 2}), frameRate:5, repeat: -1});
    this.anims.create({ key: 'StanceForm', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'stance', end: 0, zeroPad: 2}), frameRate:5, repeat: 0});
    this.anims.create({ key: 'Jumping', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'jump', end: 2, zeroPad: 2}), frameRate:15, repeat: 0});
    this.anims.create({ key: 'Crouching', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'crouch', end: 0, zeroPad: 2}), frameRate:5, repeat: -1});
    this.anims.create({ key: 'Stabbing', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'stab', end: 2, zeroPad: 2}), frameRate:25, repeat: 0});
    this.anims.create({ key: 'Slashing', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'slash', end: 3, zeroPad: 2}), frameRate:25, repeat: 0});
    this.anims.create({ key: 'GotHit', frames: this.anims.generateFrameNames('PlayerAnims', {prefix: 'hit', end: 2, zeroPad: 2}), frameRate:5, repeat: 0});

    // creating animation for reg slime
    this.anims.create({ key : 'slimeMove', frames: this.anims.generateFrameNames('SlimeAnims', {prefix: 'move', end: 7, zeroPad: 2}), frameRate:5 , repeat: -1})
    this.anims.create({ key : 'slimeIdle', frames: this.anims.generateFrameNames('SlimeAnims', {prefix: 'move', end: 0 , zeroPad: 2}), frameRate:5 , repeat: 0})
    this.anims.create({ key: 'slimeAttack', frames: this.anims.generateFrameNames('SlimeAnims', {prefix: 'attack', end: 7, zeroPad: 2}), frameRate: 10, repeat: -1})

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
    
    this.regSlime = new Enemy(this, this.newbie.block, 1205, 600, 25)
    
    this.enemies.push(this.regSlime, this.spdSlime)

    // stuff for camera and world bounds
    this.physics.world.bounds.width = 1600
    this.physics.world.bounds.height = 600
    this.cameras.main.setBounds(0, 0, 1600, 600)
    this.cameras.main.startFollow(this.newbie)

    this.nextScene = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)
    this.nextSkip = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
    this.skip = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)

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
      if(!this.textToDungeon){
        this.add.text(1400, 200, 'press N to go on')
        this.textToDungeon = true
      }
      if(this.nextScene.isDown){
        this.scene.start('dungeon-one')
      }
    }

    if(this.newbie.x >= 350){
      if(!this.text1){
        this.startText = this.add.text(350, 200, 'set your direction (A or D) hold stance (SPACE) then J for stab and K for slash') 
        this.text1 = true
      }
    }

    // if(this.skip.isDown){
    //   this.scene.start('final-lvl')
    // }
    // if(this.nextSkip.isDown){
    //   this.scene.start('dungeon-one')
    // }
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
          if(n.getData(`canHit`) && (n.getData(`spearAttack`) || n.getData('slashspearAttack'))) {
            e.takeHit(5)
              console.log(e.hp)
              console.log(this.gettingHit)
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

      n.takeHit(5)
        console.log(n.hp)

      if(n.hp <= 0){
        this.scene.start('game-over')
      }

      // player should go right
      if(n.block - 50 < e.x - 50){
        n.gettingHit = true
        n.body.setVelocity(650, -100)
        e.body.setVelocity(-800, -100)
      }

      
      // player should go left
      if(n.block + 50 > e.x - 50){
        n.gettingHit = true
        n.body.setVelocity(-650, -100)
        e.body.setVelocity(800, -100)
      }
  }
}
