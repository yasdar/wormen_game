import 'phaser';
export class Preload extends Phaser.Scene {
   
    img:Phaser.GameObjects.Image;
    TXT:Phaser.GameObjects.Text;
     constructor() {super("Preload");}
     
     preload(): void {
        console.log('preload--------------Preload');
        this.load.on('loaderror', this.OnError,this);
        //loader text animation
        this.img = this.add.image(this.cameras.main.width*0.5,this.cameras.main.height*0.5,'loading')
        this.TXT = this.add.text(0,0,'loading...',{ font: 'bold 26px Arial', color: '#ffff00',
        shadow: { color: '#000000', fill: true, offsetX: 1, offsetY: 1, blur: 0 }});
        this.TXT.setOrigin(0.5,0.5);
        this.TXT.x = this.cameras.main.width*0.49;
        this.TXT.y = this.cameras.main.height*0.5;

        //listeners
         this.load.on('progress', this.fileComplte,this);
         this.load.on('complete', this.complete,this);
        
        
     }
     OnError(error:any){
        alert('game say : OnError  :'+error.url)
    }
     create(): void {
        this.scene.start("PlayGame");
    }

     fileComplte(progress:any){
         // console.log("loading...",(progress));
          this.TXT.setText('Loading '+Math.round(progress*100)+'%')
        }
        
        complete(){console.log("all assets loaded");}
 }