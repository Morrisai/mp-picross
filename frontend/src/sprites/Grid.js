import Square from '../sprites/Square';
import config from '../config';

export default class {
  constructor ({ scene, gameBoard, client }) {
      //console.log(scene)
   
    this.scene = scene;
    this.grid = [];
    this.client = client;
    
    let size = Math.floor( (config.width-config.padding-(gameBoard[0].length+1)) / gameBoard[0].length );
    console.log(config.width, size*gameBoard[0].length)

    gameBoard.forEach( (row,rowIndex) => {
        let newRow = [];        
        row.forEach((column,columnIndex)=>{   
            
            let sizePlusPadding = size+1

            let xPos = (columnIndex*sizePlusPadding ) + config.padding/2;
            let yPos = (rowIndex*sizePlusPadding)+ config.padding/2
           
            let square =new Square({scene,size,xPos, yPos});           

            square.setId({rowIndex,columnIndex});
            square.updateState(column)
            scene.add.existing(square)  
            newRow.push(square);           
            
            square.client = this.client;
            square.on('pointerdown', this.onClick);
            
        })               
        this.grid.push(newRow);   
    })  
    

    Phaser.Display.Align.In.Center(this,scene);

  }

  onClick(){   
    
     this.client.dispatchMove(this.id)
  }
  destroy(){
    if(this.grid.length>0){
        this.grid.forEach( (row,rowIndex) => {               
            row.forEach((column,columnIndex)=>{
                column.destroy();
            })
        })
        this.grid = [];
    }
  }

 updateGameState(gameState){
     this.grid[gameState.row][gameState.column].updateState(gameState.value);
 }

}
