import 'phaser';

export class PlayGame extends Phaser.Scene {
   
     constructor() {super("PlayGame");}
    
     preload(): void {
         console.log('preload--------------PlayGame');
        
     }
     create(): void {
        console.log('create--------------PlayGame');
     }
    }