const CreatePuzzleFromImage  = require("./CreatePuzzleFromImage");

const MAX_X = 3;


class Game{
    

    constructor(){
        
        

        
    }
    startNewGame(){
        this.gameState = [];
        this.hintData = [];
        this.numOfXs = 0;
        this.isGameOver = false;
        

        return CreatePuzzleFromImage("./puzzle_images/poca.png",10).then((puzzle)=>{
           
            if(puzzle.length != puzzle[0].length) {
                throw new Error("Puzzle must be square!")
            }  
    
            this.puzzle = puzzle;   
    
            
            this.creatBlankGameState();             
            this.createHintData()   

        }).catch(function (err) {
            // handle an exception
            console.log(err)
        });
    }

    creatBlankGameState(){
        this.puzzle.forEach((row)=>{
            let newRow = [];
            row.forEach((column)=>{
                newRow.push({r:255, g:255, b:255, a:255})
            })
            this.gameState.push(newRow);
        })

        //console.log(this.gameState)
    }

    checkUserMove(data){
        
        //checkIfCorrect
        //return correct or error
        if(this.puzzle[data.row][data.column].a!=0){
            this.gameState[data.row][data.column] = this.puzzle[data.row][data.column];
        }
        else {
            //wrong answer
            this.gameState[data.row][data.column] = "x";
            this.numOfXs++
           
        }
        if(this.numOfXs === MAX_X){
            this.isGameOver = true;
        }
        return {row: data.row,
                column: data.column,
                value:this.gameState[data.row][data.column],
                numOfXs:this.numOfXs,
                maxXs:MAX_X
        };
        

    }

    getGameState(){
        return this.gameState;
    }
    getHintData(){
        return this.hintData;
    }
    getCurrentStateWithHints(){
        return {
                gameState:this.getGameState(),
                hints:this.getHintData()
        }
    }

    createHintData(){

        const boardSize = this.puzzle[0].length;

         //do columns first 
        const hintColumns = [];
        this.puzzle[0].forEach((column, columnIndex)=>{
            let streak = 0;
            hintColumns[columnIndex] = [] 
            this.puzzle.forEach((row,rowIndex)=>{  
                                              
                if(row[columnIndex].a!=0){                    
                    streak++                   
                    
                    //if we reach the end of the row with an active streak. Save it and move on
                    //even though we're going vertical, its the same length as we're dealing with a square grid. 
                    if(rowIndex===boardSize-1){
                        hintColumns[columnIndex].push(streak)
                        streak=0;
                    }

                    //if we have a streak and come across a blank.  save the streak and move on
                } else if (streak>0 && row[columnIndex].a===0){
                    hintColumns[columnIndex].push(streak)
                    streak=0
                }                
            })
            if( hintColumns[columnIndex].length === 0)
                hintColumns[columnIndex].push(0);
        })

         
      
        //Rows
        const hintRows = []
        this.puzzle.forEach((row, rowIndex)=>{             
            let streak = 0;            
            hintRows[rowIndex] = [];
            row.forEach((column, columnIndex)=>{ 
                if(column.a!=0){
                    streak++                  
                    if(columnIndex===boardSize-1){
                        hintRows[rowIndex].push(streak)
                        streak=0;
                    }
                } else if (streak > 0 && column.a === 0){
                    hintRows[rowIndex].push (streak)
                    streak=0;
                }  
               
            })
            if( hintRows[rowIndex].length ===0)
                hintRows[rowIndex].push(0);
        })

        this.hintData= {
            hintRows,
            hintColumns
        }        

        
    }
}

module.exports = Game;


