class Game{
    

    constructor(){
        this.puzzle = [
                        [ 1, 1, 0, 0, 1, 1, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 1, 1, 0, 1, 0, 0 ],
                        [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                        [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
                        [ 0, 0, 1, 0, 1, 1, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 1, 1, 0, 0, 1, 1 ] 
                    ];

        console.log(this.puzzle);            

        this.gameState = [];
        this.creatBlankGameState();

        this.hintData = []; 
        this.createHintData()   

    }
    creatBlankGameState(){
        this.puzzle.forEach((row)=>{
            let newRow = [];
            row.forEach((column)=>{
                newRow.push(0)
            })
            this.gameState.push(newRow);
        })

        //console.log(this.gameState)
    }

    checkUserMove(data){

        //checkIfCorrect
        //return correct or error
        if(this.puzzle[data.row][data.column]){
            this.gameState[data.row][data.column] = 1;
        }
        else {
            //wrong answer
            this.gameState[data.row][data.column] = "x";
        }

        return {row: data.row,
                column: data.column,
                value:this.gameState[data.row][data.column]
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
        
        //do columns first
        
        let hintColumns = [];

        this.puzzle[0].forEach((column, columnIndex)=>{
            let streak = 0;
            hintColumns[columnIndex] =[] 
            this.puzzle.forEach((row)=>{                    
                if(row[columnIndex]===1){
                    streak++
                    //even though we're going vertical, its the same length as we're dealing with a square grid. 
                    if(streak===row.length){
                        hintColumns[columnIndex].push(streak)
                        streak=0;
                    }
                } else if (streak>0 && row[columnIndex]===0){
                    hintColumns[columnIndex].push(streak)
                    streak=0
                }
            })
            streak = 0
        })

         
      
        //Rows
        let hintRows = []
        this.puzzle.forEach((row, rowIndex)=>{             
            let streak = 0;            
            hintRows[rowIndex] = [];
            row.forEach((column, columnIndex)=>{ 
                if(column===1){
                    streak++                  
                    if(streak===row.length){
                        hintRows[rowIndex].push(streak)
                        streak=0;
                    }
                } else if (streak > 0 && column === 0){
                    hintRows[rowIndex].push (streak)
                    streak=0;
                }  
            })
        })

        this.hintData= {
            hintRows,
            hintColumns
        }        
    }
}

module.exports = Game;


