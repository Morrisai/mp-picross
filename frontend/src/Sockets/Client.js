import io from 'socket.io-client';

export default class Client {
	constructor(gameState) {
		this.game = gameState;
		
		const serverUrl = __DEV__ ? 'http://localhost:3000' : ''; // eslint-disable-line

		this.socket = io(serverUrl);
		this.socket.on('connect', function() {});
		this.socket.on('disconnect', function() {});

		this.socket.on('game', data => {
			this.gotGameState(data);
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
