import {Detection} from '../objects/Detection.js'
import {HitNumber} from '../objects/HitNumber.js'
export class SpdSlime extends Phaser.GameObjects.Sprite{
    constructor(scene, target, x, y, hp){
        super(scene, x, y, 'SpdSlimeAnims')
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.collideWorldBounds = true
            this.hp = hp
            this.alive = true
            this.target = target

            this.detection = new Detection(this.scene, this.x, this.y, 1500, 900)
            this.atckDetect = new Detection(this.scene, this.x, this.y, 200, 300)
            
            this.attackingDetection()
            this.Detecting()
            this.setScale(.5)
            this.setOrigin(.5)
            this.atckDetection = false
            this.detected = false

            this.attackCounter = 1000
            this.attackTimer = 1000

            this.activeAnimation = 'spdSlimeIdle'
            this.nextAnimation = 'spdSlimeIdle'

            this.scene.enemies.push(this);
    }
    preUpdate(t, d){
        super.preUpdate(t, d)

        this.body.setSize(250, 300, true)
        this.body.setOffset(60,90)

        this.attackTimer -= d

        this.detection.setPosition(this.body.position.x, this.body.position.y)
        this.atckDetect.setPosition(this.body.position.x, this.body.position.y)

        this.body.setVelocityY(0)

        if(this.detected){
            this.nextAnimation = 'spdSlimeMove'
        }

        if(this.atckDetection){
            this.nextAnimation = 'spdSlimeAttack'
        }
        

        // if this.target.x < or > this.body.position then this tells it to flip the sprite or not
        if(this.target.x <= this.body.position.x){
            this.flipX = false
        }else if(this.target.x >= this.body.position.x){
            this.flipX = true
            this.slimeFlipFlop = true
        }


        if(this.nextAnimation !== this.activeAnimation){
            this.anims.play(this.nextAnimation)
            this.activeAnimation = this.nextAnimation
        }

        this.atckDetection = false
        this.detected = false

    }
    create(){}
    takeHit(damage){
            if(this.attackTimer > 0) return
            this.hp -= damage
            this.attackTimer = 300
            new HitNumber(this.scene, this.x, this.y, damage)
            if(this.hp <= 0){
                this.detection.destroy()
                this.atckDetect.destroy()
                this.destroy()
                this.alive = false
            }
    }

    Detecting(){
        this.scene.physics.add.overlap(
            this.detection,
            this.target,
            this.move,
            null,
            this
        )
    }
    attackingDetection(){
        this.scene.physics.add.overlap(
            this.atckDetect,
            this.target,
            this.attack,
            null,
            this
        )
    }
    move(){
        this.detected = true
        if(this.alive){
            this.scene.physics.moveToObject(this, this.target, 200)
        }
    }
    attack(){
        this.atckDetection = true 
        if(this.attackTimer <0){
            this.attackTimer = this.attackCounter
        }
    }
}