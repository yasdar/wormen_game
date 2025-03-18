export class Pressure extends Phaser.GameObjects.Container {
/**left jumping bar */
baseShape:Phaser.GameObjects.Graphics;
sqaureShape:Phaser.GameObjects.Graphics;

keyA:Phaser.Input.Keyboard.Key;
MoveDown:boolean = true;
onBottom:boolean = false;

_W:number;
_H:number;
Miny:number;
Maxy:number;


    constructor(scene:Phaser.Scene) {
        super(scene,0,0);

        this._W = this.scene.cameras.main.width;
        this._H = this.scene.cameras.main.height;

        this.CreateShapes();
        this.listenToKey();

        this.scene.add.existing(this);

    }CreateShapes(){

        let Xi:number = 64;
        let Wi:number = 58;

        this.Miny = (this._H*0.1)+4;
        this.Maxy =  (this._H*0.7)- (Wi-8)-4;

        this.baseShape = this.scene.add.graphics();
        this.baseShape.lineStyle(2,0x000000,1)
        this.baseShape.strokeRoundedRect(Xi, this._H*0.1,Wi,this._H*0.7, 2);
        this.baseShape.closePath();
        this.baseShape.strokePath();

        this.sqaureShape =  this.scene.add.graphics();
        this.sqaureShape.fillStyle(0x333333);
        this.sqaureShape.fillRoundedRect(Xi+4, this.Miny,Wi-8,Wi-8, 0);

        this.add(this.baseShape);
        this.add(this.sqaureShape);

    }listenToKey(){

        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyA.on('down', (key:any, event:any) =>
            {
                if(!this.MoveDown){return;}
                if(this.onBottom){return;}
                let DY:number = this.sqaureShape.y-32;
                if(DY < 0 ){DY = 0}
                this.MoveDown  = false;
                this.scene.tweens.add({
                    targets: this.sqaureShape,
                    y: DY,
                    ease: Phaser.Math.Easing.Bounce.Out,
                    duration: 100,
                    onComplete:()=>{this.MoveDown  = true;}
                });
               
            });


    }update(){

       if(this.onBottom){return;}
       if(this.MoveDown){this.sqaureShape.y += 2;}
       if(this.sqaureShape.y >= this.Maxy){this.onBottom = true;}

    }
    reset(){
       
        this.sqaureShape.y =  0;
        this.onBottom = false;
    }
  
   
    
  }
  