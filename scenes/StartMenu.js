export class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: "start-menu", active: true });

    
  }

  preload() {
    this.load.image('red','../image/redTwo.png')
  }

  create() {
    // this.red.body.isCircle = true

    //making a group for the sprite to add all the physics needy thingys
    this.group = this.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true,
    })

    //creating from the group physics into the sprite 'red' | .setCircle is the radius half the diameter 
    this.red1 = this.group.create(200,500,'red').setCircle(43)
    this.red2 = this.group.create(600,500,'red').setCircle(43)
  


    //welcome text 
    this.welcome = this.make.text({
        x:400,
        y:150,
        text:'Welcome to this game               I for controls                 SPACE to continue',
        origin: { x:0.5, y:0.5 },
        style:{
          font:'bold 25px Arial',
          fill:'white',
          wordWrap: {width: 300, useAdvancedWrap: false}
        }
    })

    // SPACE key
    this.nextSceneButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    //for turning off and on physics for the welcome text
    this.kbP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

    //keys to move welcome text
    this.kbUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.kbRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.kbDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.kbLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

    //add a block to cover and uncover the info tab | have a square same color as background that toggles showing the info | changing scenes and then just adding a ton a texts cuz easier
    this.infoSceneButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)


    //welcome text physics | adding it to physics | makeing the text collide with the perimeter | makes it bouncy
    this.physics.add.existing(this.welcome)
    this.welcome.body.collideWorldBounds = true


    this.welcome.body.setVelocity(0,0)
    //adding this method to create AKA making it exist(i think)
    this.createColliders();

  }

  update() {

    //SPACE switches main level
    if(this.nextSceneButton.isDown){
      this.scene.start('main-level') 
    }

    //I changes the scenes to the InfoTab scene
    if(this.infoSceneButton.isDown){
      this.scene.start('info-tab')
    }


    //stops gravity and velocity for welcome text 
    if(this.kbP.isDown){
      this.welcome.body.setAllowGravity(false)
      this.welcome.body.setVelocity(0,0)
    }
    if(this.kbP.isUp){
      this.welcome.body.setAllowGravity(true)
    }


    //move welcome text up
    if(this.kbUp.isDown){
      this.welcome.body.setVelocityY(-200)
    }

    //move welcome text right with a rotate
    if(this.kbRight.isDown){
      this.welcome.body.setAngularVelocity(0)
      this.welcome.body.setVelocityX(200)
    }


    //move welcome text left with a rotate
    if(this.kbLeft.isDown){
      this.welcome.body.setAngularVelocity(0)
      this.welcome.body.setVelocityX(-200)
    }


    //move welcome text down
    if(this.kbDown.isDown){
      this.welcome.body.setVelocityY(200)
    }

    }
  createColliders(){
    this.physics.add.collider(
      this.welcome,
      this.group)

    this.physics.add.collider(this.group, this.group)
 }

}


    // comment in for controller/gamepad support (A Button to Start)
    // if (this.input.gamepad.total > 0) {
    //   const pad = this.input.gamepad.getPad(0);
    //   if (pad.A) {
    //     this.scene.start("main-level");
    //   }
    // }