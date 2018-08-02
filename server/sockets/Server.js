const randomString = require('randomstring');

const Promise = require('promise');

class Server {
	constructor(io) {
		const Game = require('../game/GameManager');
		const game = new Game();

		this.rooms = {};
		this.io = io;

		this.io.on('connection', (socket) => {

			
			socket.on('joinRoom', (room) => {
				socket.join(room);
				socket.roomId = room;
				this.rooms[room].sockets.push(socket);
			});

			socket.on('createRoom', () => {
				this.createRoom(socket).then(() => {
					this.startGame(game, socket.roomId);
				});
			});

			// if (
			// 	game &&
			// 	!game.isGameOver &&
			// 	!game.isGameWon
			// ) {
			// 	//console.log(game.isGameOver, "emitInitialState")
			// 	this.emitInitialState(game, socket.roomId);
			// } else {
			// 	this.startGame(game, socket.roomId);
			// }

			socket.on('startGame', () => {
				console.log('startGame', socket.roomId);
				if (!socket.roomId) {
					this.createRoom(socket);
				}

				this.startGame(game, socket.roomId);
			});

			socket.on('userMove', (data) => {
				if (game.isGameOver) {
					this.emitGameOver();
					return;
				}

				if (!isNaN(data.row) && !isNaN(data.column)) {
					let currentGameState = game.checkUserMove(data);

					if (currentGameState.isGameOver) {
						this.emitGameOver(currentGameState, socket.roomId);
					} else if (currentGameState.isGameWon) {
						this.emitGameWon(currentGameState, socket.roomId);
					} else {
						io.to(socket.roomId).emit('userMoveUpdate', currentGameState);
					}
				} else {
					console.log('bad data', data); // eslint-disable-line
				}
			});
		});
	}

	createRoom(socket) {
		return new Promise((resolve) => {
			const newRoom = randomString.generate({
				length: 5,
				charset: 'alphabetic',
				capitalization: 'uppercase'
			});
			this.rooms[newRoom] = {};
			this.rooms[newRoom].active = true;
			this.rooms[newRoom].sockets = [socket];

			socket.join(newRoom);
			socket.emit('joinedRoom', newRoom);
			socket.roomId = newRoom;

			console.log('room created:', socket.roomId);

			resolve();
		});
	}
	startGame(game, roomId) {
		game.startNewGame().then(() => {
			this.emitInitialState(game, roomId);
		});
	}

	emitInitialState(game, roomId) {
		this.io.to(roomId).emit('initalState', game.getCurrentStateWithHints());
	}

	emitGameOver(currentGameState, roomId) {
		this.io.to(roomId).emit('gameOver', currentGameState);
	}
	emitGameWon(currentGameState, roomId) {
		this.io.to(roomId).emit('gameWon', currentGameState);
	}
}

module.exports = Server;
