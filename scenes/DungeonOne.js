import { Player } from '../objects/Player.js'
import { SpdSlime } from '../objects/SpdSlime.js'
import { bruteSlime } from '../objects/bruteSlime.js'
import { Enemy } from '../objects/Enemy.js';
export class DungeonOne extends Phaser.Scene{
  constructor() {
    super({ key: 'dungeon-one'})
  }
  preload(){
    this.load.image('lvlOneBackground', 'image/lvlOneBackground.png')
    this.load.atlas('bruteSlimeAnims', 'image/bruteSpriteSheet.png', 'image/bruteSprites.json')
  }

  addPlatform(x, y, wd, ht){
    const platform = this.add.rectangle(x, y, wd, ht, 0xff0000, 0)
    this.physics.add.existing(platform)
    this.add.existing(platform)
    platform.body.setAllowGravity(false)
    platform.body.setImmovable(true)
    this.platforms.push(platform)
  }

  create(){
    this.lvl1Background = this.add.image(0, 0, 'lvlOneBackground')

    // going to next lvl
    this.nextLvlButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)
    this.goingForward = false
    this.gFwrdT = false
    this.nextLvlSq = this.add.rectangle(3500, 2465, 270, 600, 0xff0000, 0)
    this.physics.add.existing(this.nextLvlSq)
    this.add.existing(this.nextLvlSq)
    this.nextLvlSq.body.setAllowGravity(false)

    // brute slime
    this.anims.create({ key: 'bruteSlimeIdle', frames: this.anims.generateFrameNames('bruteSlimeAnims', {prefix: 'move', end: 0, zeroPad: 2}), frameRate: 5, repeat: 0})
    this.anims.create({ key: 'bruteSlimeMove', frames: this.anims.generateFrameNames('bruteSlimeAnims', {prefix: 'move', end: 2, zeroPad: 2}), frameRate: 5, repeat: 0})
    this.anims.create({ key: 'bruteSlimeAttack', frames: this.anims.generateFrameNames('bruteSlimeAnims', {prefix: 'attack', end: 2, zeroPad: 2}), frameRate: 5, repeat: -1})

    // creating animation for spd slime | the prefix is right i put it wrong
    this.anims.create({ key: 'spdSlimeAttack', frames: this.anims.generateFrameNames('SpdSlimeAnims', {prefix: 'move', end: 2, zeroPad: 2}), frameRate: 5, repeat: -1})
    this.anims.create({ key: 'spdSlimeMove', frames: this.anims.generateFrameNames('SpdSlimeAnims', {prefix: 'attack', end: 2, zeroPad: 2}), frameRate: 5, repeat: -1})
    this.anims.create({ key: 'spdSlimeIdle', frames: this.anims.generateFrameNames('SpdSlimeAnims', {prefix: 'move', end: 0, zeroPad: 2}), frameRate: 5, repeat: 0})

    this.enemies = []
    this.platforms = []
    this.addPlatform(1500, 320, 3000, 100)
    this.addPlatform(2050, 770, 2900, 100)
    this.addPlatform(1450, 1255, 2900, 100)
    this.addPlatform(2050, 1800, 2900, 100)

    this.newbie = new Player(this, 50, 120)

    // just keeping this here incase
    // this.spd0 = new SpdSlime(this, this.newbie.block, 1500, 160, 25)
    // this.brute0 = new bruteSlime(this, this.newbie.block, 800, 164, 80)

    // this.brute1 = new bruteSlime(this, this.newbie.block, 1700, 600, 80)
    // this.brute2 = new bruteSlime(this, this.newbie.block, 1400, 600, 75)

    // this.spd1 =  new SpdSlime(this, this.newbie.block, 1500, 1100, 20)
    // this.brute3 = new bruteSlime(this, this.newbie.block, 1800, 1100, 90)

    // this.spd2 = new SpdSlime(this, this.newbie.block, 1200, 1600, 20)
    // this.spd3 = new SpdSlime(this, this.newbie.block, 1400, 1600, 15)
    // this.brute4 = new bruteSlime(this, this.newbie.block, 1650, 1600, 100)

    // this.spd4 = new SpdSlime(this, this.newbie.block, 700, 2400, 20)
    // this.reg0 = new Enemy(this, this.newbie.block, 900, 2400, 10)
    // this.reg1 = new Enemy(this, this.newbie.block, 1200, 2400, 10)
    // this.reg2 = new Enemy(this, this.newbie.block, 1350, 2400, 10)
    // this.reg3 = new Enemy(this, this.newbie.block, 1550, 2400, 10)

    // this.enemies.push(this.spd0, this.brute0, this.brute1, this.brute2, this.spd1, this.brute3, this.spd2, this.spd3, this.brute4, this.spd4, this.reg0, this.reg1, this.reg2, this.reg3)

    this.enemies.push(
      new SpdSlime(this, this.newbie.block, 1500, 160, 25),
      new bruteSlime(this, this.newbie.block, 800, 164, 80),

      new bruteSlime(this, this.newbie.block, 1700, 600, 80),
      new bruteSlime(this, this.newbie.block, 1400, 600, 75),

      new SpdSlime(this, this.newbie.block, 1500, 1100, 20),
      new bruteSlime(this, this.newbie.block, 1800, 1100, 90),

      new SpdSlime(this, this.newbie.block, 1200, 1600, 20),
      new SpdSlime(this, this.newbie.block, 1400, 1600, 15),
      new bruteSlime(this, this.newbie.block, 1650, 1600, 100),

      new SpdSlime(this, this.newbie.block, 700, 2400, 20),
      new Enemy(this, this.newbie.block, 900, 2400, 10),
      new Enemy(this, this.newbie.block, 1200, 2400, 10),
      new Enemy(this, this.newbie.block, 1350, 2400, 10),
      new Enemy(this, this.newbie.block, 1550, 2400, 10)
    )
      
    // stuff for camera and world bounds
    this.physics.world.bounds.width = 3500
    this.physics.world.bounds.height = 2465
    this.cameras.main.setBounds(0, 0, 3500, 2465)
    this.cameras.main.startFollow(this.newbie)

    this.lvl1Background.setOrigin(.0000001)
  }
  update(){
    if(this.goingForward && this.nextLvlButton.isDown){
      this.scene.start('final-lvl')
    }

    if(this.goingForward){
      if(!this.gFwrdT){
        this.add.text(3320, 2265, 'Press N to enter')
        this.gFwrdT = true
      }
    }
    this.createColliders()
  }
  createColliders(){
    this.physics.add.collider(
      this.newbie,
      this.enemies,
      this.gameOver,
      null,
      this
    )
    this.physics.add.collider(
      this.newbie,
      this.platforms
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
      this.enemies,
      this.platforms
    )
    
    this.physics.add.overlap(
      this.newbie.block,
      this.nextLvlSq,
      this.nextPlz, 
      null, 
      this
    )
  }

  gameOver(n,e){

    n.takeHit(5)
    console.log(n.hp)
    if(n.hp <= 0){
    this.scene.start('game-over')
    }

    // player should go right
    if(n.x - 50 > e.x - 50){
    n.gettingHit = true
    n.body.setVelocity(-650, -100)
    e.body.setVelocity(800, -100)
    return
    }
      
    // player should go left
    if(n.x + 50 < e.x - 50){
    n.gettingHit = true
    n.body.setVelocity(-650, -100)
    e.body.setVelocity(800, -100)
    return
    }
  }

  nextPlz(){
    this.goingForward = true
  }
}