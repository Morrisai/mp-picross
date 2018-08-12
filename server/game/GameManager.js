const CreatePuzzleFromImage = require('./CreatePuzzleFromImage');
const puzzleList = require('./puzzleList');
const GameModel = require('./GameModel');

const MAX_X = 6;

class GameManager {
	constructor() {
		this.games = {};
	}

	startNewGame(roomId) {
		const rand = Math.floor(Math.random() * puzzleList.length);
		const randPuzzle = puzzleList[rand];

		this.games[roomId] = new GameModel(roomId);

		return CreatePuzzleFromImage(randPuzzle, 10)
			.then((puzzle) => {
				if (puzzle.length != puzzle[0].length) {
					throw new Error('Puzzle must be square!');
				}

				this.games[roomId].puzzle = puzzle;

				this.createBlankGameState(roomId);
				this.createHintData(roomId);
			})
			.catch(function(err) {
				// handle an exception
				console.log(err); // eslint-disable-line
			});
	}

	createBlankGameState(roomId) {
		this.games[roomId].puzzle.forEach((row) => {
			let newRow = [];
			row.forEach(() => {
				newRow.push({r: 255, g: 255, b: 255, a: 255});
			});
			this.games[roomId].gameState.push(newRow);
		});
	}

	checkUserMove(data, roomId) {
		const userMoveString = data.row.toString() + data.column.toString();
		const game = this.games[roomId];
		//check if boxed checked yet. help to prevent race condition of two players checking the same box at the same time.
		if (!game.userMoves.includes(userMoveString)) {
			if (game.puzzle[data.row][data.column] === 'x') {
				game.numOfXs++;
			} else {
				game.numToFillArr.totalNumber--;

				game.numToFillArr.numInRowToFill[data.row]--;
				game.numToFillArr.numInColumnToFill[data.column]--;
			}

			if (game.numOfXs === MAX_X) {
				game.isGameOver = true;
			}

			if (game.numToFillArr.totalNumber === 0) {
				game.isGameWon = true;
			}
			game.gameState[data.row][data.column] =
				game.puzzle[data.row][data.column];
		} else {
			console.log('user moved checked already'); // eslint-disable-line
		}
		//record user Move
		game.userMoves.push(userMoveString);

		return {
			row: data.row,
			column: data.column,
			value: game.gameState[data.row][data.column],
			numLeftInRow: game.numToFillArr.numInRowToFill[data.row],
			numLeftInColumn: game.numToFillArr.numInColumnToFill[data.column],
			numOfXs: game.numOfXs,
			maxXs: MAX_X,
			isGameOver: game.isGameOver,
			isGameWon: game.isGameWon
		};
	}

	getCurrentStateWithHints(roomId) {
		const game = this.games[roomId];
		//	console.log(game)
		return {
			gameState: game.getGameState(),
			hints: game.getHintData(),
			leftToFill: game.getLeftToFill(),
			xState: {
				MAX_X,
				numOfXs: game.numOfXs
			}
		};
	}

	createHintData(roomId) {
		const game = this.games[roomId];
		const boardSize = game.puzzle[0].length;

		//do columns first
		const hintColumns = [];
		const numInColumnToFill = [];
		game.puzzle[0].forEach((column, columnIndex) => {
			let streak = 0;
			let numPerColumn = 0;

			hintColumns[columnIndex] = [];

			game.puzzle.forEach((row, rowIndex) => {
				if (row[columnIndex] != 'x') {
					streak++;
					numPerColumn++;
					//if we reach the end of the row with an active streak. Save it and move on
					//even though we're going vertical, its the same length as we're dealing with a square grid.
					if (rowIndex === boardSize - 1) {
						hintColumns[columnIndex].push(streak);
						streak = 0;
					}
					//if we have a streak and come across a blank.  save the streak and move on
				} else if (streak > 0 && row[columnIndex] === 'x') {
					hintColumns[columnIndex].push(streak);
					streak = 0;
				}
			});
			if (hintColumns[columnIndex].length === 0)
				hintColumns[columnIndex].push(0);

			numInColumnToFill.push(numPerColumn);
			numPerColumn = 0;
		});

		//Rows
		const hintRows = [];
		const numInRowToFill = [];
		game.puzzle.forEach((row, rowIndex) => {
			let streak = 0;
			let numPerRow = 0;

			hintRows[rowIndex] = [];

			row.forEach((column, columnIndex) => {
				if (column != 'x') {
					streak++;
					numPerRow++;
					if (columnIndex === boardSize - 1) {
						hintRows[rowIndex].push(streak);
						streak = 0;
					}
				} else if (streak > 0 && column === 'x') {
					hintRows[rowIndex].push(streak);
					streak = 0;
				}
			});
			if (hintRows[rowIndex].length === 0) hintRows[rowIndex].push(0);

			numInRowToFill.push(numPerRow);
			numPerRow = 0;
		});

		game.hintData = {
			hintRows,
			hintColumns
		};

		/*since there's overlap of hints, and we only want the actual real total. we only need to sum rows or columns. 
        Not both.  Both rows and coluumns should have equare numbers anyways. 
        */
		const totalNumber = numInRowToFill.reduce((a, b) => a + b);

		game.numToFillArr = {
			numInRowToFill,
			numInColumnToFill,
			totalNumber
		};
	}
}

module.exports = GameManager;
