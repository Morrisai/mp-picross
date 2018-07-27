/* globals __DEV__ */
import 'phaser'
import Banner from '../sprites/Banner'
import Grid from '../sprites/Grid';
import Client from '../Sockets/Client';
import config from '../config';


class Game extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'GameScene'
    });
}

  init() {}
  preload() { }

  create() {

    
     let bmd = this.add.graphics();    
     bmd.fillStyle(0xececec, 1);
     bmd.fillRect(0, 0, config.width,config.height);

    this.client = new Client(this);
     Banner(this, config.width / 2, config.height - 80);
     
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
 
  }
  updateGrid(gameState){
    this.grid.updateGameState(gameState)
  }
 

  update() {
    
    
  }
}

export default Game;