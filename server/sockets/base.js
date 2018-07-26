module.exports = function (io) { // io stuff here... io.on('conection..... 


var Game = require ("../game/game");
let game = new Game();

// 

io.on('connection', (socket)=>{
   
    socket.emit("initalState", game.getCurrentStateWithHints())

    socket.on('event', (data)=>{

        
       
    });

    socket.on('userMove', ( data)=>{
        if(!isNaN(data.row) && !isNaN(data.column)){   
            io.emit("userMoveUpdate", game.checkUserMove(data));       
        } else {
            console.log("bad data", data);
        }
   });
   
});





}

