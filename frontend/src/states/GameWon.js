
import config from '../config';
import Banner from '../sprites/Banner';
import Button from '../sprites/Button';
import lang from '../lang';

class GameOver extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'GameWonScene'
    });
}


  init () {}

  preload () {
    
  }

  create () {
    console.log('gameWon created')

    let bmd = this.add.graphics();    
    bmd.fillStyle(config.backgroundColor, 1);
    bmd.fillRect(0, 0, config.width,config.height);
    bmd.alpha = 0
   
    const gameWon = Banner(this, config.width / 2, 200, lang.text('gameWon'), 100);

    const start = new Button(this, config.width / 2, config.height-150, lang.text('playAgain'), 75);  
    this.add.existing(start); 
    start.once('pointerdown', this.startGame,this)

    gameWon.setAlpha(0)
    start.setAlpha(0)  

        this.tweens.add({
          targets: [start,gameWon],
          alpha: { value: '1', duration: 1000, ease: 'Cubic.easeOut' }
      });
  }

  startGame(){
    
    this.scene.switch('GameWonScene','GameScene');
   
  }
}

export default GameOver;