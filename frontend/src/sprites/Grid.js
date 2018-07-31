import Square from '../sprites/Square';
import config from '../config';
import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Container {
	constructor({ scene, gameBoard, client }) {
		super(scene, 0, 0);

		this.grid = [];
		this.client = client;
		this.rowHints = [];
		this.columnHints = [];
		this.gameBoard = gameBoard;

		const gridLength = this.gameBoard.gameState[0].length;

		this.squareSize = Math.min(
			100,
			Math.floor(
				(config.width - config.padding - (gridLength + 1)) / gridLength
			)
		);

		const sizePlusPadding = this.squareSize + 1;
		const halfPadding = config.padding / 2;

		//first draw grid lines
		const graphics = this.scene.add.graphics();
		graphics.lineStyle(1, 0xaaaaaa, 1);
		// graphics.strokeRect(halfPadding, halfPadding, gridLength*sizePlusPadding,gridLength*sizePlusPadding);

		this.add(graphics);
		this.gameBoard.gameState.forEach((row, rowIndex) => {
			let newRow = [];
			let yPos = rowIndex * sizePlusPadding + halfPadding;
			//draw a line every 5 squares
			if (rowIndex > 0 && rowIndex % 5 === 0) {
				graphics.beginPath();
				graphics.moveTo(halfPadding, yPos);
				graphics.lineTo(gridLength * sizePlusPadding + halfPadding, yPos);
				graphics.strokePath();

				graphics.beginPath();
				graphics.moveTo(yPos, halfPadding);
				graphics.lineTo(yPos, gridLength * sizePlusPadding + halfPadding);
				graphics.strokePath();
			}
			row.forEach((column, columnIndex) => {
				let xPos = columnIndex * sizePlusPadding + halfPadding;

				let square = new Square({ scene, size: this.squareSize, xPos, yPos });

				square.setId({ rowIndex, columnIndex });

				square.updateState(column);
				this.add(square);
				newRow.push(square);

				square.client = this.client;
				square.on('pointermove', this.onClick);
				square.on('pointerdown', this.onClick);
			});

			this.grid.push(newRow);
			this.addHints(rowIndex);
		});
	}

	addHints(index) {
		//since our board is always square we can create both row and column hints at the same time.
		//create hint text with double spaced numbers for legibility
		const rowHint = this.gameBoard.hints.hintRows[index].join('  ');
		let color =
			this.gameBoard.leftToFill.numInRowToFill[index] > 0
				? config.hintColor
				: config.hintFinishedColor;
		let rowLabel = this.scene.add.text(
			config.padding / 2 - 5,
			index * (this.squareSize + 1) + config.padding / 2,
			rowHint,
			{
				fontSize: this.squareSize,
				color: color,
				smoothed: false,
				fontFamily: 'Arial',
				backgroundColor: 0x000000
			}
		);
		rowLabel.setOrigin(1, 0);
		this.add(rowLabel);
		this.rowHints.push(rowLabel);

		//use /n to break onto new lines for vertical hints
		const columnHint = this.gameBoard.hints.hintColumns[index].join('\n');
		color =
			this.gameBoard.leftToFill.numInColumnToFill[index] > 0
				? config.hintColor
				: config.hintFinishedColor;
		const columnLabel = this.scene.add.text(
			0, //set width based on final size of text field. IE two digets need more space
			config.padding / 2 - 5,
			columnHint,
			{
				fontSize: this.squareSize * 0.75,
				color: color,
				smoothed: false,
				fontFamily: 'Arial',
				backgroundColor: 0x000000,
				align: 'center'
			}
		);
		columnLabel.setOrigin(0, 1);
		columnLabel.x =
			index * (this.squareSize + 1) +
			config.padding / 2 +
			(this.squareSize - columnLabel.displayWidth) / 2;

		this.add(columnLabel);
		this.columnHints.push(columnLabel);
	}
	onClick(pointer) {
		if (pointer.isDown && !this.clicked) {
			this.clicked = true;
			this.client.dispatchMove(this.id);
		}
	}
	updateGameState(gameState) {
		this.gameBoard.gameState[gameState.row][gameState.column] = gameState.value;
		this.grid[gameState.row][gameState.column].updateState(gameState.value);

		if (gameState.numLeftInRow === 0) {
			this.rowHints[gameState.row].setColor('#f2ba00');
		}

		if (gameState.numLeftInColumn === 0) {
			this.columnHints[gameState.column].setColor('#f2ba00');
		}
	}
}
