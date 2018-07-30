import io from 'socket.io-client';


export default class Client {

    constructor(gameState){   
             
        this.game = gameState;

        this.socket = io();
        this.socket.on('connect', function(){ console.log("connected")});
        this.socket.on('disconnect', function(){console.log("disconnected")});

        this.socket.on("game", (data)=>{
            console.log("game") 
            this.gotGameState(data);
        });

        this.socket.on("gameOver", (data)=>{    
            console.log("gameOver")      
            this.gotGameOver();
        });

        this.socket.on("gameWon", (data)=>{          
            this.gotGameWon();
        });

        this.socket.on("userMoveUpdate", (data)=>{
            this.gotUserMove(data);
        });

        this.socket.on("initalState", (data)=>{
            console.log("initalState",data) 
            this.gotInitialGameState(data);
        });

        
    }
  
    
    startGame(){
        this.socket.emit('startGame'); 
    }
    restartGame(){
        this.socket.emit('startGame'); 
    }

    dispatchMove({rowIndex, columnIndex}){
        
        return this.socket.emit('userMove', {row:rowIndex,column:columnIndex});    
    }
    gotGameState(data){
        this.gameStateData = data;   
        this.game.updateGrid(this.gameStateData);
    }
    gotUserMove(userMove){     
        this.game.updateGrid(userMove);
    }

    gotInitialGameState(data){
        this.initGameState = data;   
        this.game.createGame(this.initGameState);    
    }

    gotGameOver(){    
        this.game.gameOver();
    }

    gotGameWon(){    
        this.game.gameWon();
    }
  
  

}