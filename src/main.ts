import $ from "jquery";
import { Boot } from "./Boot";
import { PlayGame } from "./PlayGame";
import { Preload } from "./Preload";

$(function(){ 
  console.log('create game'); 
    startGame();
});
function startGame(){
      new Phaser.Game(
        {
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 1024,
            height: 768
        },
        backgroundColor: '#3E91D0',
        scene: [Boot,Preload,PlayGame]
    }
    );

   }