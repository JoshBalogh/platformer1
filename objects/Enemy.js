import {Detection} from '../Objects/Detection.js'
import {sqDetection} from '../Objects/sqDetection.js'

export class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, target, x, y, hp){
        super(scene, x, y, 'SlimeAnims')
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.collideWorldBounds = true 
            this.hp = hp 
            this.target = target
            this.alive = true
            // look @ last project and use the system for finding new enemies i think that will help alot 
            this.detection = new Detection(this.scene, this.x, this.y, 500, 500)
            this.attacksDetect = new Detection(this.scene, this.x, this.y, 200, 200) 
            this.attacksDetect.setOrigin(.4)
            this.setOrigin(1)
            this.setScale(.75)
            this.detectingSomething()
            this.attackingDetecting()
            this.detected = false
            this.atDetect = false
            this.slimeFlipFlop = false
        
            this.attackCounter = 1000
            this.attackTimer = 1000

            this.activeAnimation = 'slimeIdle'
            this.nextAnimation = 'slimeIdle'

    }
    preUpdate(t, d){
        
        this.body.setSize(350 ,200, true)
        this.body.setOffset(160, 310)
        // for sprites **1(in todo.md)
        super.preUpdate(t, d)

        // this gets the detection circle to move with the enemy
        this.detection.setPosition(this.body.position.x , this.body.position.y)
        this.attacksDetect.setPosition(this.body.position.x, this.body.position.y)


        this.attackTimer -= d
        //console.log(`${this.attackTimer}`)
       

        // to not have enemy float not allow to change Y 
        this.body.setVelocityY(0) 

        // all of this is for switching animations | change this to true and falses and attackTimer <= 0

        // determine animation that should be playing

        // change it to moving if it's in the moving circle
        if(this.detected){
            this.nextAnimation = 'slimeMove'
        }

        // override the nextAnimation if they are in the attacking zone
        if(this.atDetect){
            this.nextAnimation = 'slimeAttack'
            this.body.setSize(350 ,450, true)
            if(!this.slimeFlipFlop)
            this.body.setOffset(160,50)
        }
        //console.log({active:this.activeAnimation, next:this.nextAnimation, attack:this.atDetect, move:this.detected})

        // only change the active animation if it has changed
        if(this.activeAnimation !== this.nextAnimation){
            this.anims.play(this.nextAnimation)
            this.activeAnimation = this.nextAnimation
        }

        // reset detectors
        this.atDetect = false
        this.detected = false

        // if this.target.x < or > this.body.position then this tells it to flip the sprite or not
        if(this.target.x + 300 <= this.body.position.x){
            this.flipX = false
            this.setData('boom', 'right')
        }else if(this.target.x - 300  >= this.body.position.x){
            this.flipX = true
            this.slimeFlipFlop = true
            this.setData('boom', 'left')
        }

        if(this.slimeFlipFlop && this.atDetect){
            this.body.setOffset(2400,60)
        }
        
        // add a 2nd detection square where it's only activated when in the attacking animation
        // when the enemy gets hit it gets pushed back so it can have a reset 
    }

    create(){}
    takeHit(damage){
        this.hp -= damage
        if(this.hp <= 0){
            this.detection.destroy()
            this.attacksDetect.destroy()
            this.destroy()
            this.alive = false
        }
    }

    detectingSomething(){
        this.scene.physics.add.overlap(
            this.detection, 
            this.target,
            this.attack,
            null,
            this
        )
    }

    attackingDetecting(){
        this.scene.physics.add.overlap(
            this.attacksDetect,
            this.target,
            this.attacking,
            null,
            this
        )
    }

    attack(d, t){
        this.detected = true
        if(this.alive){
            this.scene.physics.moveToObject(this, this.target, 30)
       } 
    }

    attacking(d, t){
            this.atDetect = true 
            if(this.attackTimer <=0){
                this.attackTimer = this.attackCounter
            }
    }

    // activateSqDetect(){
    //     this.
    // }
}