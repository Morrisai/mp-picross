const CreatePuzzleFromImage  = require("./CreatePuzzleFromImage");
const puzzleList = require("./puzzleList")

const MAX_X = 3;


class Game{
    

    constructor(){
        
        

        
    }
    startNewGame(){
        this.gameState = [];        
        this.numOfXs = 0;        
        this.isGameOver = false;
        this.isGameWon = false;
        var rand = Math.floor(Math.random()*puzzleList.length);
        var randPuzzle = puzzleList[rand]

      
        return CreatePuzzleFromImage(randPuzzle,10).then((puzzle)=>{
           
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
       

        if(this.puzzle[data.row][data.column]==="x"){
            this.numOfXs++
        } else {
            this.numToFillArr.totalNumber--

            this.numToFillArr.numInRowToFill[data.row]--
            this.numToFillArr.numInColumnToFill[data.column]--
           
        }

        if(this.numOfXs === MAX_X){
            this.isGameOver = true;
        }

      

        if( this.numToFillArr.totalNumber ===0 ){
            this.isGameWon = true;
        }

        this.gameState[data.row][data.column] = this.puzzle[data.row][data.column];

        return {
                row: data.row,
                column: data.column,
                value:this.gameState[data.row][data.column],
                numLeftInRow:  this.numToFillArr.numInRowToFill[data.row],
                numLeftInColumn: this.numToFillArr.numInColumnToFill[data.column],
                numOfXs:this.numOfXs,
                maxXs:MAX_X,
                isGameOver:this.isGameOver,
                isGameWon:this.isGameWon
            };
        

    }

    getGameState(){
        return this.gameState;
    }
    getHintData(){
        return this.hintData;
    }
    getLeftToFill(){
        return this.numToFillArr;
    }
    getCurrentStateWithHints(){
        return {
                gameState:this.getGameState(),
                hints:this.getHintData(),
                leftToFill:this.getLeftToFill()
        }
    }
   

    createHintData(){

        const boardSize = this.puzzle[0].length;



         //do columns first 
        const hintColumns = [];
        const numInColumnToFill = []
        this.puzzle[0].forEach((column, columnIndex)=>{
            let streak = 0;
            let numPerColumn = 0;          
            
            hintColumns[columnIndex] = [] 
            
            this.puzzle.forEach((row,rowIndex)=>{                                               
                if(row[columnIndex]!="x"){                    
                    streak++                   
                    numPerColumn++
                    //if we reach the end of the row with an active streak. Save it and move on
                    //even though we're going vertical, its the same length as we're dealing with a square grid. 
                    if(rowIndex===boardSize-1){
                        hintColumns[columnIndex].push(streak)                       
                        streak=0;                       
                    }
                    //if we have a streak and come across a blank.  save the streak and move on
                } else if (streak>0 && row[columnIndex]==="x"){
                    hintColumns[columnIndex].push(streak)
                    streak=0
                }                
            })
            if( hintColumns[columnIndex].length === 0)
                hintColumns[columnIndex].push(0);

            numInColumnToFill.push(numPerColumn)
            numPerColumn=0;
        })

         
      
        //Rows
        const hintRows = []
        const numInRowToFill=[];
        this.puzzle.forEach((row, rowIndex)=>{  

            let streak = 0;   
            let numPerRow = 0;    

            hintRows[rowIndex] = [];
           

            row.forEach((column, columnIndex)=>{ 
                if(column!="x"){
                    streak++  
                    numPerRow++;                
                    if(columnIndex===boardSize-1){
                        hintRows[rowIndex].push(streak)                        
                        streak=0;
                    }
                } else if (streak > 0 && column === "x"){
                    hintRows[rowIndex].push (streak)
                    streak=0;
                }  
               
            })
            if( hintRows[rowIndex].length ===0)
                hintRows[rowIndex].push(0);

                
            numInRowToFill.push(numPerRow)
            numPerRow=0

        })

        this.hintData= {
            hintRows,
            hintColumns,
        }           

        /*since there's overlap of hints, and we only want the actual real total. we only need to sum rows or columns. 
        Not both.  Both rows and coluumns should have equare numbers anyways. 
        */
        const totalNumber = numInRowToFill.reduce((a, b) => a + b);
        this.numToFillArr = { 
            numInRowToFill,
            numInColumnToFill,
            totalNumber
        }   

        
       
        

        
    }
}

module.exports = Game;


