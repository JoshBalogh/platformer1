export class HitNumber extends Phaser.GameObjects.Text{
    constructor(scene, x, y, number){
        super(scene, x, y, number)
        this.scene = scene
        this.scene.add.existing(this)
        this.timer = 5000
    }
    preUpdate(t,d){
        this.timer -= d 
        this.y -= 1
        if(this.timer <= 0){
            this.destroy()
        }
    }
}