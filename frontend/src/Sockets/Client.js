import io from 'socket.io-client';

export default class Client {
	constructor() {
		const serverUrl = __DEV__ ? 'http://localhost:3000' : ''; // eslint-disable-line

		this.socket = io(serverUrl);
		this.socket.on('connect', () => {});

		this.socket.on('disconnect', () => {});

	

		this.socket.on('joinedRoom', roomId => {
			this.room = roomId;
		});

		this.socket.on('gameOver', () => {
			this.gotGameOver();
		});

		this.socket.on('gameWon', () => {
			this.gotGameWon();
		});

		this.socket.on('userMoveUpdate', data => {
			this.gotUserMove(data);
		});

		this.socket.on('initalState', data => {
			this.gotInitialGameState(data);
		});
	}

	startGame() {
		this.socket.emit('startGame');
	}
	restartGame() {
		this.socket.emit('startGame');
	}
	createRoom() {
		this.socket.emit('createRoom', '', data => {
			this.gotInitialGameState(data);
		});
	}
	joinRoom(roomId, fn) {
		this.socket.emit('joinRoom', roomId, fn);
	}

	dispatchMove({ rowIndex, columnIndex }) {
		return this.socket.emit('userMove', { row: rowIndex, column: columnIndex });
	}
	gotGameState(data) {
		this.gameStateData = data;
		this.game.updateGrid(this.gameStateData);
	}
	gotUserMove(userMove) {
		this.game.updateGrid(userMove);
	}

	getInitialGameState(roomId) {
		this.socket.emit('getInitialState', roomId);
	}

	gotInitialGameState(data) {
		this.initGameState = data;
		this.game.createGame(this.initGameState);
	}

	gotGameOver() {
		this.game.gameOver();
	}

	gotGameWon() {
		this.game.gameWon();
	}
}
