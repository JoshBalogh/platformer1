export class InfoTab extends Phaser.Scene{
    constructor(){
        super({key: 'info-tab'})

    }
    preload(){
    }

    create(){
        // this.make.text(x,y,text,origin{x,y},style{font,fill,wordWrap{width,useAdvancedWrap: boolean}})

        //info text 
        this.make.text({
            x:400,
            y:150,
            text:'W = jump  A = Left     D = Right    S = Crouch    SPACE = Stance          J = Stab                                              Press SPACE to go back',
            origin: {},
            style:{
                font:'bold 25px Arial',
                fill:'white',
                wordWrap: {width:600}
            }
        })

        this.back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    update(){
        //pressing SPACE = going back to start menu
        if(this.back.isDown){
            this.scene.start('start-menu')
        }
    }

}
