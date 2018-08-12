import config from '../config';
import Banner from '../sprites/Banner';
import Button from '../sprites/Button';
import lang from '../lang';
import Phaser from 'phaser';
import JoinRoom from '../sprites/JoinRoom';
import Client from '../Sockets/Client';

class Splash extends Phaser.Scene {
	constructor() {
		super({
			key: 'SplashScene'
		});
	}

	init() {}

	preload() {}

	create() {
		this.client = new Client();

		let bmd = this.add.graphics();
		bmd.fillStyle(0xececec, 1);
		bmd.fillRect(0, 0, config.width, config.height);

		const title = Banner(
			this,
			config.width / 2,
			200,
			lang.text('title'),
			125,
			config.primaryColor,
			config.titleFont
		);
		title.stroke = '#000000';
		title.strokeThickness = 6;
		title.fill = '#17c12d';
		title.setShadow(0, 2, '#000', 5);

		const start = new Button(
			this,
			config.width / 2,
			config.height - 150,
			lang.text('start'),
			75
		);

		this.add.existing(start);

		start.setAlpha(0);
		title.setAlpha(0);
		this.tweens.add({
			targets: [start, title],
			alpha: { value: '1', duration: 1000, ease: 'Cubic.easeOut' }
		});

		this.joinRoom = new JoinRoom(
			this,
			(config.width - 315) * 0.5, //315 is real width when measuring DOM text box
			(config.height - 113) * 0.5 //113 is real height when measuring with DOM text box
		);

		this.add.existing(this.joinRoom);

		this.joinRoom.on('joinGame', this.joinGame, this);
		start.once('pointerdown', this.startGame, this);
	}
	joinGame(scene, roomId) {
		this.client.joinRoom(roomId, roomId => {
			this.onJoin(roomId);
		});
	}

	onJoin(data) {
		if (data.error && data.error === 'noroom') {
			this.joinRoom.onError(
				`Sorry, the room ${data.room.toUpperCase()}, does not exist. Please try again or create a new game.`
			);
		} else {
			this.scene.start('GameScene', { client: this.client, roomId: data.room });
		}
	}

	startGame() {
		this.scene.start('GameScene', { client: this.client });
	}
}
export default Splash;
