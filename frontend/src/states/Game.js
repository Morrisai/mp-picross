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
    bmd.fillStyle(0x42f474, 1);
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
      client: this.client    
    })      
  }
  updateGrid(gameState){
    this.grid.updateGameState(gameState)
  }
 

  render() {
    if (__DEV__) {
     // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}

export default Game;