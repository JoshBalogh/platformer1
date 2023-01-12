
export class Enemy extends Phaser.GameObjects.Rectangle{
    constructor(scene, target, config = {} ){
        super(scene, config.x, config.y, config.wd, config.ht, config.color, config.hp)
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.collideWorldBounds = true 
            this.x = config.x
            this.y = config.y
            this.width = config.wd
            this.height = config.ht
            this.color = config.color
            this.dm = config.dm
            this.sp = config.sp 
            this.hp = config.hp 
            this.target = target
            this.alive = true

            this.setOrigin(1)

    }
    preUpdate(){
        //have enemy chase player in a radius | enemies not chasing | dont understand y
       if(this.alive){
            this.scene.physics.moveToObject(this, this.target, 50)
//to not have enemy float not allow to change Y
        }else {
            this.sp = 0
        }
      this.body.setVelocityY(2)
    }
    create(){}
    takeHit(damage){
        this.hp -= damage
        if(this.hp <= 0){
            this.destroy()
        }
    }
}