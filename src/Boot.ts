import 'phaser';

export class Boot extends Phaser.Scene {

     constructor() {super("Boot");}

     preload(): void {
         console.log('preload--------------Boot')
         this.load.image("loading","./assets/images/loading.png"); 
     }
     create(): void {
        this.scene.start("Preload");
     }
 }