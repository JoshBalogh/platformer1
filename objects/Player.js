export class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'playerIdle') 
        this.scene = scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.body.collideWorldBounds = true
        this.anims.play('Idling')
    
        // sets the origin so the player rectangle shrink from top to bottom
        this.setOrigin(1)
        this.setScale(.2)
        
        // all the movement keys
        this.rightMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.leftMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.jumpMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.crouchMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.pauseMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // attack keys
        this.attack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        //this.attackLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)


        // create a square resembling a spear
        // change this later, so its just a detecting circle for the spear on the sprite
        this.spear = this.scene.add.rectangle(this.body.x, this.body.y, 100, 10, 0x1177ff)
        this.scene.physics.add.existing(this.spear)
        this.spear.body.setAllowGravity(false)


        // jumps is how many jumps there are  | maxJumps is how many time you can jump | jumpCoolDown...
        this.jumps = 0
        this.maxJumps = 32
        this.jumpCooldown = false

        // setData stuff ('first', true or false) | first is what the method is being called 
        this.spear.setData(`canHit`, true)
        this.spear.setData(`spearAttack`, false)

    }
    preUpdate(t,d){
        super.preUpdate(t, d);
            /*if player on floor then jumps = 0 else if jumps = 0 but it isn't on floor it will add to jump so when 
            maxJumps are at 2(or what you put it at)*/
        if(this.body.onFloor()) {
            this.jumps = 0 
        } else if(this.jumps === 0){
             this.jumps++
        }
        
        // setting position for spear
        this.spear.setPosition(this.body.x + 30, this.body.y + 50)

        // spear moves right
        if(this.attack.isDown && this.rightMove.isDown && this.pauseMove.isDown){ 
            this.spear.setData(`spearAttack`, true)
            this.spear.x += 50
        }
        // spear moves left
        if(this.attack.isDown && this.leftMove.isDown && this.pauseMove.isDown){ 
            this.spear.setData(`spearAttack`, true)
            this.spear.x -= 50
           
        }
        // this is for when spear is back then it wont do damage to the enemy ever frame
        if(this.attack.isUp){
            this.spear.setData(`canHit`, true)
            this.spear.setData(`spearAttack`, false)
        }
         
        // player jump needs to be on floor
        if(this.jumpMove.isDown){
            if(this.jumps < this.maxJumps && !this.jumpCooldown){
                this.body.setVelocityY(-300)
                this.jumps++
                this.jumpCooldown = true
            }
        }else{
            this.jumpCooldown = false 
        } 

        // evertime it checks if it's right key, left key, or no key
        if(this.rightMove.isDown){
            this.body.setVelocityX(200)
            this.flipX = false
        }else if(this.leftMove.isDown){
            this.body.setVelocityX(-200)
            this.flipX = true
        }else{
            this.body.setVelocityX(0)
        }

        // makes the player stop so it's like your going into a stance | need to add this sprite
        if(this.pauseMove.isDown){
            this.body.setVelocityX(0)
        }
        




    } 
       
}