import io from 'socket.io-client';


export default class Client {

    constructor(gameState){   
             
        this.socket = io('http://192.168.2.15:3000');
        this.socket.on('connect', function(){ console.log("connected")});
        this.socket.on('disconnect', function(){console.log("disconnected")});

        this.socket.on("gameState", (data)=>{

            this.gotGameState(data, gameState);
        });

        this.socket.on("userMoveUpdate", (data)=>{

            this.gotUserMove(data, gameState);
        });

        this.socket.on("initalState", (data)=>{

            this.gotInitialGameState(data, gameState);
        });

        
    }


  dispatchMove({rowIndex, columnIndex}){
     
      return this.socket.emit('userMove', {row:rowIndex,column:columnIndex});    
  }
  gotGameState(data,gameState){
    this.gameStateData = data;   
    gameState.updateGrid(this.gameStateData);
  }
  gotUserMove(userMove,gameState){     
    gameState.updateGrid(userMove);
  }

  gotInitialGameState(data,gameState){
    this.initGameState = data;   
    gameState.createGrid(this.initGameState);    
  }
  
  

}