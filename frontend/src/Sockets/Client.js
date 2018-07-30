import io from 'socket.io-client';


export default class Client {

    constructor(gameState){   
             
        this.game = gameState;

        this.socket = io('http://192.168.2.15:3000');
        this.socket.on('connect', function(){ console.log("connected")});
        this.socket.on('disconnect', function(){console.log("disconnected")});

        this.socket.on("game", (data)=>{

            this.gotGameState(data);
        });

        this.socket.on("gameOver", (data)=>{          
            this.gotGameOver();
        });

        this.socket.on("gameWon", (data)=>{          
            this.gotGameWon();
        });

        this.socket.on("userMoveUpdate", (data)=>{
            this.gotUserMove(data);
        });

        this.socket.on("initalState", (data)=>{
            
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
        this.game.createGrid(this.initGameState);    
    }

    gotGameOver(){    
        this.game.gameOver();
    }

    gotGameWon(){    
        this.game.gameWon();
    }
  
  

}