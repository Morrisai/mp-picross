import Phaser from 'phaser'
import Square from '../sprites/Square';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, gameBoard, client }) {
    super(game, x, y);
    this.grid = [];
    this.client = client;

    gameBoard.forEach( (row,rowIndex) => {

        let newRow = [];        
        row.forEach((column,columnIndex)=>{       
            let square =new Square({game}); 
            
            if(columnIndex>0){
                square.alignTo(newRow[columnIndex-1], Phaser.RIGHT_CENTER, 1);               
            }
            square.y = rowIndex*(square.height+1);
            square.events.onInputDown.add(this.onClick, this);

            square.id = {rowIndex,columnIndex};
            square.updateState(column)
            this.addChild(square);           
            newRow.push(square);   
        })               
        this.grid.push(newRow);   
    })
  }

  onClick(e){
    this.client.dispatchMove(e.id)
  }

 updateGameState(gameState){
     this.grid[gameState.row][gameState.column].updateState(gameState.value);
 }



  update () {
   
  }
}
