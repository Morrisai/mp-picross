module.exports = function (io) { // io stuff here... io.on('conection..... 


const Game = require ("../game/game");
const game = new Game();

// 

io.on('connection', socket=>{     

    if(game.isGameOver!=undefined && game.isGameWon!=undefined && !game.isGameOver && !game.isGameWon){
        //console.log(game.isGameOver, "emitInitialState")
        emitInitialState(game)
    } else {
        startGame(game);
    }

    socket.on('startGame', ()=>{
        startGame(game)
        
    })    

    
    socket.on('userMove',  data=>{ 

        if(game.isGameOver) {
            emitGameOver();
            return;
        }
             
        if(!isNaN(data.row) && !isNaN(data.column)){   
            
            let currentGameState = game.checkUserMove(data);
            
            if(currentGameState.isGameOver){
                emitGameOver(currentGameState);
            }else if(currentGameState.isGameWon){
                emitGameWon(currentGameState);
            }
            else {
                io.emit("userMoveUpdate",currentGameState );
            }
            
            
              
                 
        } else {
            console.log("bad data", data);
        }
   });
});

const startGame = (game)=>{
    game.startNewGame().then(()=>{
        emitInitialState(game)
    });
}

const emitInitialState=(game)=>{
    io.emit("initalState", game.getCurrentStateWithHints());
}

const emitGameOver = (currentGameState)=>{


    io.emit("gameOver",currentGameState);
}
const emitGameWon = (currentGameState)=>{


    io.emit("gameWon",currentGameState);
}


}

