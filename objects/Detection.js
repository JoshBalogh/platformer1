export class Detection extends Phaser.GameObjects.Ellipse{
    constructor(scene, x, y){
        super(scene, x, y, 500, 500, 0x00ff00, 0)
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.isCircle = true
            this.body.setAllowGravity(false)
            this.setOrigin(.5)
            this.x = x 
            this.y = y
        //  when true it will go towards the target (aka player)
    }
    preUpdate(){
       /*using this class to see if detected then move to target i feel like this will be better for adding it to multiple enemies and so the enemies 
       can have different types of stuff i don't know exactly yet tho
       
       FIGURE OUT IF IM GOING TO USE THIS  */         
    }
}