export class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'playerIdle') 
        this.scene = scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.body.collideWorldBounds = true


        
        //sets the origin so the player rectangle shrink from top to bottom
        this.setOrigin(1)
        this.setScale(.2)
        
        //all the movement keys
        this.rightMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.leftMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.jumpMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.crouchMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.pauseMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //attack keys
        this.attack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
       // this.attackLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)


       // create a square resembling a spear
       this.spear = this.scene.add.rectangle(this.body.x, this.body.y, 100, 10, 0x1177ff)
        this.scene.physics.add.existing(this.spear)
        this.spear.body.setAllowGravity(false)


        //jumps is how many jumps there are  | maxJumps is how many time you can jump | jumpCoolDown...
        this.jumps = 0
        this.maxJumps = 2
        this.jumpCooldown = false

        this.spear.setData(`canHit`, true)
        this.spear.setData(`spearAttack`, false)


       
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
        if(this.attack.isDown && this.rightMove.isDown && this.pauseMove.isDown){ 
            //check spear up and out might have gotten those mixed up | try DATA next time
            console.log(`${this.spear.getData(`canHit`)} set at start of preUpdater and changing to true`)
            this.spear.setData(`spearAttack`, true)
            this.spear.x += 50
        }
        //spear moves left
        if(this.attack.isDown && this.leftMove.isDown && this.pauseMove.isDown){ 
            this.spear.setData(`spearAttack`, true)
            this.spear.x -= 50
            console.log(`${this.spear.getData(`canHit`)} attack isDown`)
           
        }

        if(this.attack.isUp){
            this.spear.setData(`canHit`, true)
            this.spear.setData(`spearAttack`, false)
            console.log(`${this.spear.getData(`canHit`)} attack isUp`)
            // TODO ?: if you pull the spear back before it hits enemy it wont do damage 
        }
         

        //setting player height & scale

    
 

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
            this.flipX = false
            this.anims.play('Idling')
        }else 
        if(this.leftMove.isDown){
            this.body.setVelocityX(-200)
            this.flipX = true
        }else{
            this.body.setVelocityX(0)
        }

        if(this.pauseMove.isDown){
            this.body.setVelocityX(0)
        }


    }
       
}