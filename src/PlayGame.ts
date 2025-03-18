import 'phaser';
import { AboutGame, gameSettings } from './Config';
import { Pressure } from './objects/Pressure';
import { CountDown } from './objects/CountDown';
import { Symbol } from './objects/Symbol';

export class PlayGame extends Phaser.Scene {
   
    red_layer:Phaser.GameObjects.Image;
    pressure:Pressure
    count_Down:CountDown;

    userTarget:Symbol;
    computerTarget:Symbol;
    forbiddenTarget:Symbol;


    icon1Target:Symbol;
    icon2Target:Symbol;
    icon3Target:Symbol;
    icon4Target:Symbol;

    player:any={name:"player",iconT:null,played:false};
    computer:any={name:"computer",iconT:null};
    CurrentTurn:any={name:null,iconT:null};

    startGame:boolean = false;

    greyicons:Array<string>=[
      "cloud",
      "crown",
      "drop",
      "square"
  ];
  redicons:Array<string>=[
    "cloud-red",
    "crown-red",
    "drop-red",
    "square-red"
];
greenicons:Array<string>=[
  "cloud-green",
  "crown-green",
  "drop-green",
  "square-green"
];


TurnCount:number;
NP_Wrong : Phaser.Sound.BaseSound;
ComputerActualIconName:string;
ComputerActualSoundName:string;
     constructor() {super("PlayGame");}
    
     preload(): void {
         console.log('preload--------------PlayGame');
        
     }
     create() {

      
        AboutGame.GameIsOver = false;
        this.TurnCount = 0;
       this.NP_Wrong = this.sound.add("NP_Wrong");
       AboutGame.playerAnswers={c:0,inc:0};
       this.ComputerActualIconName= '';
       this.ComputerActualSoundName ='';

      if(this.cameras.main.width>this.cameras.main.height){
        AboutGame.ScaleFactor = this.cameras.main.width/1366;
        AboutGame.IsPortrait = false;
          }else{
              AboutGame.ScaleFactor = this.cameras.main.width/769;
              AboutGame.IsPortrait = true;
          }
    console.log("  AboutGame.ScaleFactor",  AboutGame.ScaleFactor)

  
      this.red_layer = this.add.image(this.cameras.main.width*0.5,this.cameras.main.height*0.5,"red").setOrigin(0.5,0.5);
      this.red_layer.setScale(0.1);
      this.red_layer.setAlpha(0);

      this.userTarget = new Symbol(this,"YOUR\nTARGET","cloud");
      this.userTarget.setPosition(this.cameras.main.width*0.3,this.cameras.main.height*0.33);
      this.userTarget.setVisible(false);

      this.computerTarget = new Symbol(this,"COMPUTER'S\nTARGET","cloud");
      this.computerTarget.setPosition(this.cameras.main.width*0.7,this.cameras.main.height*0.33);
      this.computerTarget.setVisible(false);

      this.forbiddenTarget = new Symbol(this,"FORBIDDEN\nTARGET","cloud");
      this.forbiddenTarget.setPosition(this.cameras.main.width*0.5,this.cameras.main.height - (this.forbiddenTarget.height*0.5) -1);
     
      //4 icons
      this.icon1Target  = new Symbol(this,"icon1","square");
      this.icon1Target.setPosition(this.cameras.main.width*0.5,this.cameras.main.height*0.34);

      this.icon2Target  = new Symbol(this,"icon2","drop");
      this.icon2Target.setPosition(this.cameras.main.width*0.33,this.cameras.main.height*0.609);
      this.icon3Target  = new Symbol(this,"icon3","cloud");
      this.icon3Target.setPosition(this.cameras.main.width*0.5,this.cameras.main.height*0.609);
      this.icon4Target  = new Symbol(this,"icon4","crown");
      this.icon4Target.setPosition(this.cameras.main.width*0.66,this.cameras.main.height*0.609);

      if(gameSettings.jumpingBar){this.pressure = new Pressure(this);}
     
      this.count_Down = new CountDown(this);
      this.count_Down.setY(this.cameras.main.height*0.1);

    //arrowKeys
    let keyLeft :Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    let keyRight :Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    let keyUp :Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    let keyDown :Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    keyLeft.on('down', (key:any, event:any) =>{if(!this.player.played && this.startGame){this.Action("Left")}});
    keyRight.on('down', (key:any, event:any) =>{if(!this.player.played && this.startGame){this.Action("Right")}});
    keyUp.on('down', (key:any, event:any) =>{if(!this.player.played && this.startGame){this.Action("Up")}});
    keyDown.on('down', (key:any, event:any) =>{if(!this.player.played && this.startGame){this.Action("Down")}});


    this.player.iconT = this.userTarget;
    this.computer.iconT = this.computerTarget;


    this.UseForbidden();

    setTimeout(() => {
     this.ToggleTurn(true);
     this.count_Down.start = true;
     this.startGame = true;
    }, 1000);


    }
    UseForbidden(){
      this.TurnCount = 0;
     // console.log("select a red icon");
      let _key = this.getRandomRed();
      this.forbiddenTarget.ChangeIcon(_key);
    }
    
    update(){
      if(!this.startGame){return;}
      //run pressure : square goes down
      if(this.pressure){
        this.pressure.update();
        if(this.pressure.onBottom){
          this.PlayBottomPressure();
        }
      }

      if(this.count_Down){
        if(this.count_Down.timeEnd){
          this.startGame = false;
          AboutGame.endGame();
        }
      }
    }
    //utils
    RelativePosition(gameobject:any,_x?:number,_y?:number){
      if(_x && _y){ gameobject.setPosition(this.cameras.main.width*_x,this.cameras.main.height*_y);}
      else if(_x){gameobject.setX(this.cameras.main.width*_x);}
        else if(_y){gameobject.setY(this.cameras.main.height*_y);}
    }
    ToggleTurn(FirstStart:boolean){
      this.TurnCount++;
      if(this.TurnCount == 8 && gameSettings.level=='easy'){this.UseForbidden();}
      else if(this.TurnCount == 5 && gameSettings.level=='medium'){this.UseForbidden();}
      else if(this.TurnCount == 3 && gameSettings.level=='hard'){this.UseForbidden();}


      if(FirstStart){
         console.log('Player Turn')
        this.CurrentTurn = this.player;
        //enable arrows for the player
        this.player.played = false;
        //collect random green icon
        this.CurrentTurn.iconT.ChangeIcon(this.getRandomGreen());
        this.CurrentTurn.iconT.setVisible(true);
        this.playAudioFor(this.CurrentTurn.iconT.iconName);

      }else{
        console.log('----------Computer Turn--------------',this.player.played)
        this.CurrentTurn = this.computer;
        //collect random green icon
      this.CurrentTurn.iconT.ChangeIcon(this.getRandomGreen());
      this.CurrentTurn.iconT.setVisible(true);

      this.ComputerActualIconName = this.CurrentTurn.iconT.iconName.replace('-green','');
    this.ComputerActualSoundName = this.getRandomGrey();
     //play audio of the iconT
     this.playAudioFor(this.ComputerActualSoundName);
     console.log("this.ComputerActualIconName",this.ComputerActualIconName);
    console.log("this.ComputerActualSoundName",this.ComputerActualSoundName);
    console.log('---------------------------------')
      }
      //console.log(this.CurrentTurn);

      

 

     

    }
    Action(arrow_name:string){
      console.log('----------Action-----------')
       //disable arrows for the player
      this.player.played = true;

      let _iconTarget:any;//Symbol

      switch (arrow_name) {
        case "Left":
          _iconTarget = this.icon2Target;
          break;
          case "Right":
            _iconTarget =this.icon4Target;
          break;
          case "Up":
            _iconTarget =this.icon1Target;
          break;
          case "Down":
            _iconTarget =this.icon3Target;
          break;
    }
    //check annswer
    if(_iconTarget != null){
    console.log('voila',this.CurrentTurn.iconT.iconName,_iconTarget.iconName);
   let C1:boolean = this.ComputerActualIconName == _iconTarget.iconName;//computer and selected icons are not the same
   console.log('computer same as selected',C1);
   let C2:boolean = this.forbiddenTarget.iconName.replace('-red','') == _iconTarget.iconName;//forbidden and selected are not the same icons
   console.log('forbidden same as selected',C2);

   let C3:boolean = this.forbiddenTarget.iconName.replace('-red','') == this.CurrentTurn.iconT.iconName.replace('-green','') ;
   console.log('My icon same as forbidden',C3);
   let C4:boolean =  this.CurrentTurn.iconT.iconName.replace('-green','') == this.ComputerActualIconName;
   console.log('My icon same as computer',C4);
   
   let C5:boolean = this.ComputerActualSoundName == _iconTarget.iconName;//you select same computer audio
   console.log('computer sound same as selected',C5);

   let C6:boolean = this.ComputerActualSoundName == this.CurrentTurn.iconT.iconName.replace('-green','');//you select same computer audio
   console.log('computer sound same as my icon',C6);

    if(C3 || C4 || C6){
      console.log('you need to select a diffrent icon');
      if(!C1 && !C2 && !C5){
        console.log('good answer 001');
        _iconTarget.showCadre(false,true);
        AboutGame.playerAnswers={c: AboutGame.playerAnswers.c+1,inc: AboutGame.playerAnswers.inc}
      }else{
        console.log('wrong answer')
      _iconTarget.showCadre(false,false);
      AboutGame.playerAnswers={c: AboutGame.playerAnswers.c,inc: AboutGame.playerAnswers.inc+2}
      }
    }


    if(!C3 && !C4){
      console.log('you need to select the actual icon');
      if(!C1 && !C2 && this.CurrentTurn.iconT.iconName.indexOf(_iconTarget.iconName) != -1){
        console.log('good answer 002');
        _iconTarget.showCadre(false,true);
        AboutGame.playerAnswers={c: AboutGame.playerAnswers.c+1,inc: AboutGame.playerAnswers.inc}
      }else{
        console.log('wrong answer')
      _iconTarget.showCadre(false,false);
      AboutGame.playerAnswers={c: AboutGame.playerAnswers.c,inc: AboutGame.playerAnswers.inc+2}
      }
    }
   
    }
    setTimeout(() => {
      //hide cadre
      _iconTarget.showCadre(false,false);
      //hide actual iconT
      this.CurrentTurn.iconT.setVisible(false);
     //play computer
      this.ToggleTurn(false);

    }, 1000);

    setTimeout(() => {this.computerAction()}, 1500);
    
  }
  computerAction(){
    //console.log("computerAction",this.CurrentTurn.iconT.iconName);
    let _iconTarget:Symbol;
    if(this.CurrentTurn.iconT.iconName.indexOf(this.icon1Target.iconName) != -1 ){_iconTarget = this.icon1Target;}
    else if(this.CurrentTurn.iconT.iconName.indexOf(this.icon2Target.iconName) != -1 ){_iconTarget = this.icon2Target;}
    else if(this.CurrentTurn.iconT.iconName.indexOf(this.icon3Target.iconName) != -1 ){_iconTarget = this.icon3Target;}
    else if(this.CurrentTurn.iconT.iconName.indexOf(this.icon4Target.iconName) != -1 ){_iconTarget = this.icon4Target;}
    
    this.ComputerActualIconName = this.CurrentTurn.iconT.iconName.replace('-green','');
    //console.log("this.ComputerActualIconName",this.ComputerActualIconName);
    

    setTimeout(() => {
      //hide cadre
      _iconTarget.showCadre(false,false);
      //hide actual iconT
      this.CurrentTurn.iconT.setVisible(false);
     //player turn
      this.ToggleTurn(true);
    }, 1000);


  }
    getRandomGreen(){
      //random value from array
    const random = Math.floor(Math.random() * this.greenicons.length);
    return this.greenicons[random];
    }
    getRandomRed(){
      //random value from array
    const random = Math.floor(Math.random() * this.redicons.length);
    return this.redicons[random];
    }
    getRandomGrey(){
      //random value from array
    const random = Math.floor(Math.random() * this.greyicons.length);
    return this.greyicons[random];
    }
    playAudioFor(name:string){
      let _name:string = name.replace("-green","");
      _name = _name.replace("-red","");
      AboutGame.AllAudios[_name].play();
    }
    PlayBottomPressure(){
        //play red explosion
        this.red_layer.setScale(0.01);
        this.red_layer.setAlpha(1);
        this.tweens.add({
          targets:this.red_layer,
          scale: 4,
          alpha:0,
          ease: 'Power1',
          duration: 1000
      });
          //play beep sound
          this.NP_Wrong.play();
          //reduce time
          this.count_Down.reduceTime();
          //reset pressure position
          this.pressure.reset();


    }
   
  }
  