export class Player extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 60, 100, 0xADD8E6) 
        this.scene = scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.body.collideWorldBounds = true
        
        //sets the origin so the player rectangle shrink from top to bottom
        this.setOrigin(1)


        //all the movement keys
        this.rightMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.leftMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.jumpMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.crouchMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        //attack keys
        this.attackRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        this.attackLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)


       // create a square resembling a spear
       this.spear = this.scene.add.rectangle(this.body.x, this.body.y, 100, 10, 0x1177ff)
        this.scene.physics.add.existing(this.spear)
        this.spear.body.setAllowGravity(false)


        //jumps is how many jumps there are  | maxJumps is how many time you can jump | jumpCoolDown...
        this.jumps = 0
        this.maxJumps = 2
        this.jumpCooldown = false


        this.spearAttack = false
    }
    preUpdate(){
        /*if player on floor then jumps = 0 else if jumps = 0 but it isn't on floor it will add to jump so when 
        maxJumps are at 2(or what you put it at)*/
        if(this.body.onFloor()) {
            this.jumps = 0 
        } else if(this.jumps === 0){
             this.jumps++
        }
        
      
        //setting position for spear
        this.spear.setPosition(this.body.x + 30, this.body.y + 50)
        //spear moves right
        if(this.attackRight.isDown){ 
            this.spearAttack = true
            this.spear.x += 50
        }
        //spear moves left
        if(this.attackLeft.isDown){ 
            this.spearAttack = true
            this.spear.x -= 50
           
        }

        //setting player height & scale
        this.scaleY = 1
    
        //for player crouch
        if(this.crouchMove.isDown){
            this.scaleY = .5;
        }

        //player jump needs to be on floor
        if(this.jumpMove.isDown){
            if(this.jumps < this.maxJumps && !this.jumpCooldown){
                this.body.setVelocityY(-300)
                this.jumps++
                this.jumpCooldown = true
            }
        }else{
            this.jumpCooldown = false 
        } 

        //evertime it checks if it's right key, left key, or no key
        if(this.rightMove.isDown){
            this.body.setVelocityX(200)
        }else 
        if(this.leftMove.isDown){
            this.body.setVelocityX(-200)
        }else{
            this.body.setVelocityX(0)
        }
    }
}