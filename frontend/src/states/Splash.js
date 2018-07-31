import { centerGameObjects } from '../utils'
import config from '../config';
import Banner from '../sprites/Banner'
import Button from '../sprites/Button';
import lang from '../lang';

class Splash extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'SplashScene'
    });
}


  init () {}

  preload () {
    
  }

  create () {

    let bmd = this.add.graphics();    
    bmd.fillStyle(0xececec, 1);
    bmd.fillRect(0, 0, config.width,config.height);
    
   
    const title = Banner(this, config.width / 2, 200, lang.text('title'), 100);
    
    const start = new Button(this, config.width / 2, config.height-150, lang.text('start'), 75);
    
    this.add.existing(start); 
    start.once('pointerdown', this.startGame,this)

    start.setAlpha(0)  
    title.setAlpha(0)
        this.tweens.add({
          targets: [start,title],
          alpha: { value: '1', duration: 1000, ease: 'Cubic.easeOut' }
      });


  }

  startGame(){
    
    this.scene.start('GameScene');
  }
}

export default Splash;