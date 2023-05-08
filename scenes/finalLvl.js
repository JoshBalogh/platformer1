import { Player } from '../objects/Player.js'
import { SpdSlime } from '../objects/SpdSlime.js'
import { bruteSlime } from '../objects/bruteSlime.js'
import { Enemy } from '../objects/Enemy.js';
import { bossSlime } from '../objects/bossSlime.js'
export class finalLvl extends Phaser.Scene{
    constructor(){
        super({ key: 'final-lvl' })
    }
    preload(){
        this.load.image('finalLvl', 'image/finalLvl.png')
        this.load.atlas('bossAnims', 'image/bossSpritesheet.png', 'image/bossSprites.json')
    }
    update(){
        this.createColliders()
    }
    create(){
        this.finalLvl = this.add.image(0, 0, 'finalLvl')

        this.anims.create({ key: 'bossAttack', frames: this.anims.generateFrameNames('bossAnims', {prefix: 'attack', end: 2, zeroPad: 2}), frameRate: 3, repeat: 0})
        this.anims.create({ key: 'bossIdle', frames: this.anims.generateFrameNames('bossAnims', {prefix: 'attack', end: 0, zeroPad: 2}), frameRate: 5, repeat: 0})

        this.enemies = []
        this.newbie = new Player(this, 50, 700)

        this.boss = new bossSlime(this, this.newbie, 850, 700, 250)

        this.enemies.push(this.boss)

        // stuff for camera and world bounds
        this.physics.world.bounds.width = 1000
        this.physics.world.bounds.height = 600
        this.cameras.main.setBounds(0, 0, 1000, 500)
        this.cameras.main.startFollow(this.newbie)
 
        this.finalLvl.setOrigin(.0000001)
        this.finalLvl.setScale(1.9)
    }
    createColliders(){
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
          this.enemies,
          this.gameOver,
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