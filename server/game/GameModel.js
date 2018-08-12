class GameModel {
	constructor(roomId) {
		this.gameState = [];
		this.numOfXs = 0;
		this.isGameOver = false;
		this.isGameWon = false;
		this.userMoves = [];
		this.roomId = roomId;
	}

	getGameState() {
		return this.gameState;
	}
	getHintData() {
		return this.hintData;
	}
	getLeftToFill() {
		return this.numToFillArr;
	}

}

module.exports = GameModel;
