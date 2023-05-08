import {HitNumber} from '../objects/HitNumber.js'
import { SpdSlime } from '../objects/SpdSlime.js'
import { bruteSlime } from '../objects/bruteSlime.js'
import { Enemy } from '../objects/Enemy.js';
export class bossSlime extends Phaser.GameObjects.Sprite{
    constructor(scene, target, x, y, hp){
        super(scene, x, y, 'bossAnims')
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.collideWorldBounds = true
            this.hp = hp
            this.alive = true
            this.target = target
            this.body.setImmovable(true)
            this.setScale(.9)

            // timers for different slime type spawn rates
            this.spdSlimeCounter = 20000 // 20 sec
            this.spdSlimeTimer = 20000

            this.bruteSlimeCounter = 35000 // 35 sec
            this.bruteSlimeTimer = 35000

            this.slimeCounter = 10000 //10 sec
            this.slimeTimer = 1000

            this.attackCounter = 1000
            this.attackTimer = 1000

            this.activeAnimation = 'bossIdle'
            this.nextAnimation = 'bossIdle'
    }
    preUpdate(t, d){
        super.preUpdate(t, d)

        this.body.setSize(600, 200, true)
        this.body.setOffset(10, 50)

        this.attackTimer -= d
        this.spdSlimeTimer -= d
        this.bruteSlimeTimer -= d
        this.slimeTimer -= d

        // 1st if block buffer 4 better animations
        if(this.spdSlimeTimer < 800){
            this.nextAnimation = 'bossAttack'
            if(this.spdSlimeTimer < 0){
                new SpdSlime(this.scene, this.target.block, 500, 600, 20)
                this.spdSlimeTimer = this.spdSlimeCounter
            }
        }

        if(this.bruteSlimeTimer < 800){
            this.nextAnimation = 'bossAttack'
            if(this.bruteSlimeTimer < 0){
                new bruteSlime(this.scene, this.target.block, 500, 600, 50)
                this.bruteSlimeTimer = this.bruteSlimeCounter
            }
        }

        if(this.slimeTimer < 800){
            this.nextAnimation = 'bossAttack'
            if(this.slimeTimer < 0){
                new Enemy(this.scene, this.target.block, 500, 600, 10)
                this.slimeTimer = this.slimeCounter
            }
        }

        this.chain('bossIdle')

        if(this.nextAnimation !== this.activeAnimation){
            this.anims.play(this.nextAnimation)
            this.activeAnimation = this.nextAnimation
        }

    }
    takeHit(damage){
        if(this.attackTimer > 0) return
            this.hp -= damage
            this.attackTimer = 1000
            new HitNumber(this.scene, this.x, this.y, damage)
            if(this.hp <= 0){
                this.destroy()
                this.alive = false
            }
    }
}