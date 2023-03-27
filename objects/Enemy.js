import {Detection} from '../Objects/Detection.js'
export class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, target, config = {} ){
        super(scene, config.x, config.y, config.hp)
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.collideWorldBounds = true 
            this.x = config.x
            this.y = config.y
            this.dm = config.dm
            this.sp = config.sp //speed
            this.hp = config.hp 
            this.target = target
            this.alive = true
            //look @ last project and use the system for finding new enemies i think that will help alot 
            this.detection = new Detection(this.scene, config.x, config.y)
            this.setOrigin(1)
            this.detectingSomething()
                
                /*NEED TO FIGURE OUT HOW IM GOING TO DO ENEMIES NOW WITH DIFFERENT SPRITES*/
    }
    preUpdate(){
            //this gets the detection circle to move with the enemy
        this.detection.setPosition(this.body.position.x, this.body.position.y)
            //to not have enemy float not allow to change Y 
        this.body.setVelocityY(0)
    }

    
    create(){}
    takeHit(damage){
        this.hp -= damage
        if(this.hp <= 0){
            this.detection.destroy()
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
    attack(){
        if(this.alive){
            this.scene.physics.moveToObject(this, this.target, 50)
       } 
    }
}