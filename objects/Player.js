export class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'PlayerAnims') 
        this.scene = scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.body.collideWorldBounds = true
        this.setOrigin(1)
        this.anims.play('Idling')

        this.activeAnimation = 'Idling'
        this.nextAnimation = 'Idling'

        // sets the origin so the player rectangle shrink from top to bottom
        this.setScale(.5)
        
        
        
        // all the movement keys
        this.rightMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.leftMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.jumpMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.crouchMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.pauseMove = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // attack keys
        this.attack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        this.slash = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        // create a square resembling a spear
        // change this later, so its just a detecting circle for the spear on the sprite
        this.spear = this.scene.add.rectangle(this.body.x -= 50, this.body.y, 10, 10, 0x000000, 0)
        this.scene.physics.add.existing(this.spear)
        this.spear.body.setAllowGravity(false)
        this.spear.body.setOffset(120,15)


        // jumps is how many jumps there are  | maxJumps is how many time you can jump | jumpCoolDown...
        this.jumps = 0
        this.maxJumps = 2
        this.jumpCooldown = false

        // setData stuff ('first', true or false) | first is what the method is being called 
        this.spear.setData(`canHit`, true)
        this.spear.setData(`spearAttack`, false)

    }
    preUpdate(t,d){
        this.body.setSize(150,350, true)
        this.body.setOffset(325, 160)

        super.preUpdate(t, d);
            /*if player on floor then jumps = 0 else if jumps = 0 but it isn't on floor it will add to jump so when 
            maxJumps are at 2(or what you put it at)*/
        if(this.body.onFloor()) {
            this.jumps = 0 
        } else if(this.jumps === 0){
             this.jumps++
        }
        this.nextAnimation = 'Idling'
        
        // setting position for spear
        this.spear.setPosition(this.body.x + 30, this.body.y + 50)

        
        // this is for when spear is back then it wont do damage to the enemy ever frame
        if(this.attack.isUp){
            this.spear.setData(`canHit`, true)
            this.spear.setData(`spearAttack`, false)
        }
        this.body.setVelocityX(0)

        

        this.setNextAnimation()

        // to check if animations correct & if its not to override 
        if(this.activeAnimation !== this.nextAnimation){
            this.anims.play(this.nextAnimation)
            this.activeAnimation = this.nextAnimation
            return
        }
    }

    setNextAnimation() { 
        // spear moves right
        if(this.attack.isDown && this.rightMove.isDown && this.pauseMove.isDown){ 
            this.spear.setData(`spearAttack`, true)
            this.spear.x += 50
            this.nextAnimation = 'Stabbing'
            this.FlipX = false
            return
        }
        // spear moves left
        if(this.attack.isDown && this.leftMove.isDown && this.pauseMove.isDown){ 
            this.spear.setData(`spearAttack`, true)
            this.spear.x -= 50
            this.nextAnimation = 'Stabbing'
            this.FlipX = true
            return
        }

        if(this.slash.isDown && this.rightMove.isDown && this.pauseMove.isDown){
            this.spear.setData('spearAttack', true)
            this.nextAnimation = 'Slashing'
            this.FlipX = false
            return
        }
        if(this.slash.isDown && this.leftMove.isDown && this.pauseMove.isDown){
            this.spear.setData('spearAttack', true)
            this.nextAnimation = 'Slashing'
            this.FlipX = true
            return
        }

        // makes the player stop so it's like your going into a stance | need to add this sprite
        if(this.pauseMove.isDown){
            this.body.setVelocityX(0)
            this.nextAnimation = 'StanceForm'
            return
        }
 
        // player jump needs to be on floor
        if(this.jumpMove.isDown){
            this.nextAnimation = 'Jumping'
            this.body.setSize(150,250, true)
            if(this.jumps < this.maxJumps && !this.jumpCooldown){
                this.body.setVelocityY(-300)
                this.jumps++
                this.jumpCooldown = true
                return
            }
        }else{
            this.jumpCooldown = false  
        }  
        
        // evertime it checks if it's right key, left key, or no key
        if(this.rightMove.isDown){
            this.body.setVelocityX(200)
            this.flipX = false
            if(!this.jumpMove.isDown){
                this.nextAnimation = 'Running'
                this.body.setSize(300,350, true)
                this.body.setOffset(240,160)
            }
            return
        }
        
        if(this.leftMove.isDown){
            this.body.setVelocityX(-200)
            this.flipX = true 
            if(!this.jumpMove.isDown){
                this.nextAnimation = 'Running'
                this.body.setSize(300,350, true)
                this.body.setOffset(240,160)
            }
            return;
        }
    
       
        
        if(this.crouchMove.isDown){
            this.nextAnimation = 'Crouching'
            this.body.setSize(150,250, true)
            this.body.setOffset(300,260 )
            return
        } 
    }
       
}