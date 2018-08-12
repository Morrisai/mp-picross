import Phaser from 'phaser';
import Banner from '../sprites/Banner';
import Grid from '../sprites/Grid';
import config from '../config';
import Button from '../sprites/Button';
import lang from '../lang';
import XState from '../sprites/XState';
import LinkText from '../sprites/LinkText';

class Game extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameScene'
		});
	}

	init(data) {
		this.client = data.client;
		this.client.game = this;

		if (data.roomId) {
			this.room = data.roomId;
			this.client.getInitialGameState(data.roomId);
		} else {
			this.client.createRoom();
		}

		if (history.pushState) {
			var newurl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				'';
			window.history.pushState({ path: newurl }, '', newurl);
		}
	}
	preload() {}

	create() {
		const bmd = this.add.graphics();
		bmd.fillStyle(0xececec, 1);
		bmd.fillRect(0, 0, config.width, config.height);

		this.title = Banner(this, 65, 15, lang.text('title'), 25, config.titleFont);

		this.restart = new Button(
			this,
			config.width / 2,
			config.height - 75,
			lang.text('restartGame'),
			50
		);
		this.add.existing(this.restart);

		this.restart.once('pointerdown', this.restartGame, this);

		this.restart.setAlpha(0);
		this.title.setAlpha(0);
	}

	//called by client
	createGame(gameBoard) {
		this.link = LinkText(this, 25, config.height - 35, gameBoard.roomId);
		this.add.existing(this.link);

		if (this.grid) {
			this.grid.destroy();
		}

		this.grid = new Grid({
			scene: this,
			gameBoard,
			client: this.client,
			xPos: 0,
			yPos: 0
		});

		this.add.existing(this.grid);

		//not sure why this is needed. Possible Bug in phaser
		this.grid.setPosition(0, 0);

		this.xRemaining = new XState(
			this,
			config.width / 2,
			20,
			gameBoard.xState.MAX_X,
			gameBoard.xState.numOfXs
		);

		this.add.existing(this.xRemaining);

		// this.grid.setAlpha(0);
		// this.restart.setAlpha(0);
		// this.tweens.add({
		// 	targets: [this.grid, this.restart, this.title],
		// 	alpha: { value: '1', duration: 1000, ease: 'Cubic.easeOut' }
		// });
	}
	updateGrid(gameState) {
		this.grid.updateGameState(gameState);

		this.xRemaining.setXState(gameState.numOfXs);
	}
	restartGame() {
		this.tweens.add({
			targets: [this.grid, this.restart, this.title],
			alpha: { value: '0', duration: 500, ease: 'Cubic.easeOut' },
			onComplete: () => {
				this.client.restartGame();
				this.scene.switch('SplashScene');
			}
		});
	}
	gameOver() {
		this.tweens.add({
			targets: [this.grid, this.restart, this.title],
			alpha: { value: '0', duration: 500, ease: 'Cubic.easeOut' },
			onComplete: () => {
				this.scene.switch('GameOverScene');
			}
		});
	}
	gameWon() {
		this.tweens.add({
			targets: [this.grid, this.restart, this.title],
			alpha: { value: '0', duration: 500, ease: 'Cubic.easeOut' },
			onComplete: () => {
				this.scene.switch('GameWonScene');
			}
		});
	}
}

export default Game;
