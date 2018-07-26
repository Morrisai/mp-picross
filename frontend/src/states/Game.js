/* globals __DEV__ */
import Phaser from 'phaser'
import Banner from '../sprites/Banner'
import Grid from '../sprites/Grid';
import Client from '../Sockets/Client';


export default class extends Phaser.State {
  init() {}
  preload() { }

  create() {

    this.client = new Client(this);

     Banner(this, this.world.centerX, this.game.height - 80);


    
    
  }

  //called by client
  createGrid(gameBoard){
    
    this.grid = new Grid({
      game: this.game,
      x: 0,
      y: 0,
      gameBoard,
      client: this.client    
    })   

    this.game.add.existing(this.grid)
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
