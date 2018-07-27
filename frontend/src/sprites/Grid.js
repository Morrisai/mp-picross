import Square from '../sprites/Square';
import config from '../config';

export default class extends Phaser.GameObjects.Container {
  constructor ({ scene, xPos,yPos,gameBoard, client, }) {
    super(scene, 0, 0);
     
   

    this.grid = [];
    this.client = client;
    this.rowHints = [];
    this.columnHints = [];
    this.gameBoard = gameBoard;
    this.numberOfX = 0;
    
    
    this.size = Math.floor( (config.width-config.padding-(this.gameBoard.gameState[0].length+1)) / this.gameBoard.gameState[0].length );
    const sizePlusPadding =  this.size+1

    this.gameBoard.gameState.forEach( (row,rowIndex) => {
        let newRow = [];        
        row.forEach((column,columnIndex)=>{

            let xPos = (columnIndex*sizePlusPadding ) + config.padding/2;
            let yPos = (rowIndex*sizePlusPadding)+ config.padding/2
           
            let square = new Square({scene, size:this.size ,xPos, yPos});           

            square.setId({rowIndex,columnIndex});
            this.numberOfX += column==="x" || 0 ; 
            square.updateState(column)
            this.add(square)  
            newRow.push(square);           
            
            square.client = this.client;
            square.on('pointermove', this.onClick);
            square.on('pointerdown', this.onClick);
            
        })               
        this.grid.push(newRow);        
        this.addHints(rowIndex);
        
    })  
    
    
    this.checkScore();

  }

  addHints(index){

   
    //since our board is always square we can create both row and column hints at the same time. 
    
    //create hint text with double spaced numbers for legibility
    const rowHint = this.gameBoard.hints.hintRows[index].join("  ");
    let rowLabel =  this.scene.add.text(
                                        config.padding/2-5,
                                        index*(this.size+1) + config.padding/2, 
                                        rowHint, 
                                        {
                                            fontSize: this.size,
                                            color: '#333333',
                                            smoothed: false,
                                            fontFamily: 'Arial',
                                            backgroundColor:0x000000
                                        })              
    rowLabel.setOrigin(1,0);
    this.add(rowLabel); 
    this.rowHints.push(rowLabel)
    

    //use /n to break onto new lines for vertical hints
    const columnHint = this.gameBoard.hints.hintColumns[index].join("\n")     
    const columnLabel =  this.scene.add.text(        
                                           0, //set width based on final size of text field. IE two digets need more space
                                            config.padding/2-5,
                                            columnHint, 
                                            {
                                                fontSize: this.size*0.75,
                                                color: '#333333',
                                                smoothed: false,
                                                fontFamily: 'Arial',
                                                backgroundColor:0x000000,
                                                align: 'center'
                                            })              
    columnLabel.setOrigin(0,1);
    columnLabel.x = index*(this.size+1) + (config.padding/2) + (this.size-columnLabel.displayWidth)/2
    
    
    
    this.add(columnLabel); 
    this.columnHints.push(columnLabel);
                                            
        
  }


  onClick(pointer){         
    if(pointer.isDown && !this.clicked){
        this.clicked = true;
        this.client.dispatchMove(this.id);
    }
  }
 
  checkScore(){
    this.gameBoard.gameState.forEach( (row,rowIndex) => {              
        row.forEach((column,columnIndex)=>{ 

        })
    })
  }

 updateGameState(gameState){
    this.numberOfX += gameState.value==="x" || 0 ; 
    this.gameBoard.gameState[gameState.row][gameState.column] = gameState.value    
    this.grid[gameState.row][gameState.column].updateState(gameState.value);

    this.checkScore();
 }

}
