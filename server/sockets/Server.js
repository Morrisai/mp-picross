const randomString = require('randomstring');
const GameManager = require('../game/GameManager');

const Promise = require('promise');

class Server {
	constructor(io) {
		this.gameManager = new GameManager();

		this.rooms = {};
		this.io = io;

		this.io.on('connection', (socket) => {
			socket.on('joinRoom', (room, fn) => {
				room = room.trim().toUpperCase();

				//check if Room exists first
				if (this.rooms[room]) {
					socket.join(room);
					socket.roomId = room;
					this.rooms[room].sockets.push(socket);
					if (fn) fn({room});
				} else {
					if (fn) fn({error: 'noroom', room});
				}
			});

			socket.on('createRoom', (data, fn) => {
				this.createRoom(socket)
					.then(() => {
						return this.gameManager.startNewGame(socket.roomId);
					})
					.then(() => {
						fn(this.gameManager.getCurrentStateWithHints(socket.roomId));
					});
			});

			socket.on('startGame', () => {
				if (!socket.roomId) {
					this.createRoom(socket);
				}

				this.startGame(socket.roomId);
			});

			socket.on('getInitialState', (roomId) => {
				this.emitInitialState(roomId);
			});

			socket.on('userMove', (data) => {
				if (this.gameManager.isGameOver) {
					this.emitGameOver();
					return;
				}

				if (!isNaN(data.row) && !isNaN(data.column)) {
					let currentGameState = this.gameManager.checkUserMove(
						data,
						socket.roomId
					);

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

			console.log('room created:', socket.roomId); // eslint-disable-line

			resolve();
		});
	}
	startGame(roomId) {
		this.gameManager.startNewGame(roomId).then(() => {
			this.emitInitialState(roomId);
		});
	}

	emitInitialState(roomId) {
		this.io
			.to(roomId)
			.emit(
				'initalState',
				this.gameManager.getCurrentStateWithHints(roomId)
			);
	}

	emitGameOver(currentGameState, roomId) {
		this.io.to(roomId).emit('gameOver', currentGameState);
	}
	emitGameWon(currentGameState, roomId) {
		this.io.to(roomId).emit('gameWon', currentGameState);
	}
}

module.exports = Server;
