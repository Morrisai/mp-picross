/* globals __DEV__ */
import 'phaser'
import Banner from '../sprites/Banner'
import Grid from '../sprites/Grid';
import Client from '../Sockets/Client';
import config from '../config';
import Button from '../sprites/Button';
import lang from '../lang';


class Game extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'GameScene'
    });
}

  init() {}
  preload() { }

  create() {
    console.log("TODO:: fix 5 space markers,fix double win screens, add some sound?")
    
     let bmd = this.add.graphics();    
     bmd.fillStyle(0xececec, 1);
     bmd.fillRect(0, 0, config.width,config.height);

    this.client = new Client(this);
   
    
    this.title = Banner(this,65, 15,  lang.text('title'), 25);

    this.restart = new Button(this, config.width / 2, config.height-75, lang.text('restartGame'), 50);  
    this.add.existing( this.restart); 
    
    this.restart.once('pointerdown', this.restartGame,this);
    
    this.restart.setAlpha(0);
    this.title.setAlpha(0);
  }

  //called by client
  createGrid(gameBoard){

    if(this.grid){
      this.grid.destroy()
    }

    this.grid = new Grid({
      scene: this,
      gameBoard,
      client: this.client,
      xPos:0,
      yPos:0   
    })   
    
    this.add.existing(this.grid);

    //not sure why this is needed. Possible Bug in phaser
    this.grid.setPosition(0,0)

    this.grid.setAlpha(0);
    this.restart.setAlpha(0);
    this.tweens.add({
      targets: [this.grid,this.restart, this.title],
      alpha: { value: '1', duration: 1000, ease: 'Cubic.easeOut' }
  });
 
  }
  updateGrid(gameState){
    this.grid.updateGameState(gameState)
  }
  restartGame(){
    this.tweens.add({
      targets: [this.grid, this.restart,this.title],
      alpha: { value: '0', duration: 500, ease: 'Cubic.easeOut' },
      onComplete: ()=>{this.client.restartGame();
        this.scene.start('SplashScene')},
    });
  }
 
  gameOver(){

    this.tweens.add({
      targets: [this.grid, this.restart,this.title],
      alpha: { value: '0', duration: 500, ease: 'Cubic.easeOut' },
      onComplete: ()=>{this.scene.switch('GameScene','GameOverScene')},
  });

    
  }
  gameWon(){
    

      this.tweens.add({
        targets: [this.grid, this.restart,this.title],
        alpha: { value: '0', duration: 500, ease: 'Cubic.easeOut' },
        onComplete: ()=>{this.scene.switch('GameScene','GameWonScene')},
    });
  }

  update() {
    
    
  }
}

export default Game;