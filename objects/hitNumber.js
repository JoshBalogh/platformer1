export class hitNumber{
    constructor(x, y){
        this.x = x, 
        this.y = y
    }
    create(){
        this.add.text(this.x, this.y, '5')
    }
    preUpdate(t,d){}
}