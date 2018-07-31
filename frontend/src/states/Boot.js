import WebFont from 'webfontloader';
import config from '../config';
import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'BootScene'
		});
	}

	init() {		
		this.fontsReady = false;
		this.fontsLoaded = this.fontsLoaded.bind(this);
	}

	preload() {
		if (config.webfonts.length) {
			WebFont.load({
				google: {
					families: config.webfonts
				},
				active: this.fontsLoaded
			});
		}

		let text = this.add.text(
			this.sys.game.config.width / 2,
			this.sys.game.config.height / 2,
			'loading fonts',
			{ font: '16px Arial', fill: '#dddddd', align: 'center' }
		);
		text.setOrigin(0.5, 0.5);

		this.load.image('loaderBg', './assets/images/loader-bg.png');
		this.load.image('loaderBar', './assets/images/loader-bar.png');
	}

	update() {
		if (config.webfonts.length && this.fontsReady) {
			this.startSplash();
		}
		if (!config.webfonts.length) {
			this.startSplash();
		}
	}

	fontsLoaded() {
		this.fontsReady = true;
	}
	startSplash() {
		this.scene.stop('SplashScene');

		this.scene.start('SplashScene');
	}
}

export default BootScene;
