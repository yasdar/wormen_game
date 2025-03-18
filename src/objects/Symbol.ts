import { AboutGame, target_font } from "../Config";

export class Symbol extends Phaser.GameObjects.Container {
    /**countDown Timer */
    cadre:Phaser.GameObjects.Graphics;
    icon:Phaser.GameObjects.Image;
    topText:Phaser.GameObjects.Text;
    _W:number;
    _H:number;
    iconName:string;

        constructor(scene:Phaser.Scene,str:string,_key:string) {
            super(scene,0,0);
            this.iconName = _key;
            this._W = this.scene.cameras.main.width;
            this._H = this.scene.cameras.main.height;

            
            this.cadre = this.scene.add.graphics();
            this.add(this.cadre);
            this.cadre.lineStyle(2,0x000000,1)

            this.icon = this.scene.add.image(0,0,_key);
            this.icon.setScale(AboutGame.ScaleFactor*0.6);
            this.add(this.icon);
           
            let Carde_width = this.icon.displayWidth*1.04;
            let Carde_height = this.icon.displayHeight*1.04;

            this.cadre.strokeRoundedRect(-Carde_width*0.5,-Carde_height*0.5,Carde_width,Carde_height, 1);
            this.cadre.closePath();
            this.cadre.strokePath();
            this.cadre.setVisible(false);

            this.topText = this.scene.add.text(0,0, str,target_font);
            this.topText.setOrigin(0.5,0.5);
            this.add(this.topText);
            this.topText.setVisible(false);

            this.width = Carde_width;
            this.height = Carde_height;

            this.scene.add.existing(this);

            
    
        }ChangeIcon(_key:string){
            this.icon.setTexture(_key);
            this.iconName = _key;
        }showCadre(v:boolean,isgood:boolean){


            
            this.cadre.clear();
            if(isgood){this.cadre.lineStyle(2,0x00ff00,1)}
            else{this.cadre.lineStyle(2,0xff0000,1)}


            let Carde_width = this.icon.displayWidth*1.04;
            let Carde_height = this.icon.displayHeight*1.04;

            this.cadre.strokeRoundedRect(-Carde_width*0.5,-Carde_height*0.5,Carde_width,Carde_height, 1);
            this.cadre.closePath();
            this.cadre.strokePath();

            this.cadre.setVisible(v);
        }
        
      
        
      }
      