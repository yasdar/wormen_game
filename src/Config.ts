import { Chart } from "chart.js";

interface _AboutGame {
    width: number,
    height: number,
    ScaleFactor:number,
    backgroundColor: number,
    GameIsOver:boolean,
    IsPortrait:boolean
    Game:Phaser.Game|null,
    endGame:any,
    AllAudios:any,
    playerAnswers:any,
    ActualChart:Chart|null;
  }
  export let  AboutGame:_AboutGame = {
      width: 1068,
      height: 600,
      ScaleFactor:1,
      backgroundColor: 0x3e5a66,
      IsPortrait:false,
      GameIsOver:false,
      Game:null,
      endGame:null,
      AllAudios:[],
      playerAnswers:{c:0,inc:0},
      ActualChart : null
    };

   

    export let  gameSettings = {
      level: "easy",
      easyLevel:{time:360,jumpbar:false},
      mediumLevel:{time:720,jumpbar:true},
      hardLevel:{time:1080,jumpbar:true},
      timeLimit: 60,
      jumpingBar: false,
    };
    export let  scoreData:any={
    totalScore:0,
    correct:0,
    incorrect:0,
    bestScore:0
}




    
    export let  countDownTimer_font:any={
      fontFamily: "Arial",
      fontSize: '24px',
      color: '#000000',
      stroke: '#333333',
      strokeThickness: 1
  }
  export let  target_font:any={
    fontFamily: "Arial",
    fontSize: '18px',
    color: '#ffffff',
    stroke: '#333333',
    strokeThickness: 1,
    align:'center'
}


export const shuffleArray = (array:any)=>{
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
