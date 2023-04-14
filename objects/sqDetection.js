export class sqDetection extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y, w, h){
        super(scene, x, y, w, h, 0x000000, 0)
            this.scene = scene
            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.body.setAllowGravity(false) 
            this.setOrigin(.5)
            this.body.setOffset(70,-30)
            this.x = x 
            this.y = y
            //set gravity is false but it still falls 
    } 
    preUpdate(){}
}