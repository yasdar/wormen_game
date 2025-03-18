import { countDownTimer_font, gameSettings } from "../Config";

export class CountDown extends Phaser.GameObjects.Container {
    /**countDown Timer */
    maxTime:number;
    _W:number;
    _H:number;
    TXT:Phaser.GameObjects.Text;
    timeEnd:boolean =false;
    start:boolean =false;
    TM:Phaser.Time.TimerEvent;

        constructor(scene:Phaser.Scene) {
            super(scene,0,0);
    
            this._W = this.scene.cameras.main.width;
            this._H = this.scene.cameras.main.height;
    
            this.maxTime = Number(gameSettings.timeLimit);

            this.TXT = this.scene.add.text(this._W*0.9, 0, '00:00',countDownTimer_font);
            this.TXT.setOrigin(0.5,0);
            let tnow:any=this.format( this.maxTime);
            this.TXT.setText(tnow._min+":"+tnow._sec);
            this.add(this.TXT);
            this.scene.add.existing(this);

            this.TM =this.scene.time.addEvent({ delay:100, callback:()=>{
                if(this.start){

                    this.maxTime -= 0.1;
                    if(this.maxTime <= 0){this.maxTime = 0;}
                    let tnow:any=this.format( this.maxTime);
                    this.TXT.setText(tnow._min+":"+tnow._sec);
                    if(this.maxTime == 0){this.timeEnd = true;this.TM.remove()}

                }
                }, callbackScope: this, loop: true });
    
        }
         //format time
    format(t:number){
        let min="00";
        let minv = Math.floor(t/60);
        min = "0"+minv.toString();
        if(min.length>2){ min = minv.toString();}
        let sec="00";
        let secv = Math.floor(t - minv*60);
        sec = secv.toString();
        if(sec.length ==1){sec='0'+sec};
        return {_min:min,_sec:sec};
      }
      reduceTime(){
        console.log( "actual time", this.maxTime);
        this.maxTime -= 5;
        if(this.maxTime < 0){this.maxTime = 0;}
        console.log( "new  time", this.maxTime);
      }
      
        
      }
      