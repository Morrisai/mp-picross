import config from '../config';
import Banner from '../sprites/Banner';
import Button from '../sprites/Button';
import lang from '../lang';
import Phaser from 'phaser';
import JoinRoom from '../sprites/JoinRoom';


class Splash extends Phaser.Scene {
	constructor() {
		super({
			key: 'SplashScene'
		});
	}

	init() {}

	preload() {}

	create() {
		let bmd = this.add.graphics();
		bmd.fillStyle(0xececec, 1);
		bmd.fillRect(0, 0, config.width, config.height);

		const title = Banner(this, config.width / 2, 200, lang.text('title'), 100);

		const start = new Button(
			this,
			config.width / 2,
			config.height - 150,
			lang.text('start'),
			75
		);

		this.add.existing(start);
		start.once('pointerdown', this.startGame, this);

		start.setAlpha(0);
		title.setAlpha(0);
		this.tweens.add({
			targets: [start, title],
			alpha: { value: '1', duration: 1000, ease: 'Cubic.easeOut' }
		});

		this.add.existing(new JoinRoom(this,  config.width/2-125, config.height/2  ));

		console.log("TODO:: Hook up buttons to join and create!")
		
	}

	startGame() {
		this.scene.start('GameScene');
	}
}

export default Splash;
