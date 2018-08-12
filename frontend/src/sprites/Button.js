import Banner from '../sprites/Banner';
import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.GameObjects.Container {
	constructor(scene, x, y, bannerText, size = 75) {
		super(scene, x, y);

		this.button = Banner(
			scene,
			0,
			0,
			bannerText,
			size,
			'#eeeeee',
			config.mainFont
		);

		const hitArea = new Phaser.Geom.Rectangle(
			-this.button.width / 2,
			-this.button.height / 2,
			this.button.width,
			this.button.height
		);

		const bg = this.scene.make.graphics();
		bg.fillStyle(0xff5722, 1);
		bg.fillRoundedRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height, 16);

		this.shadow = this.scene.make.graphics();
		this.shadow.fillStyle(0x000000, 0.8);
		this.shadow.fillRoundedRect(
			hitArea.x,
			hitArea.y + 3,
			hitArea.width,
			hitArea.height,
			16
		);

		this.shadow.setAlpha( 1 ,1,0,0)

		this.bgRoll = this.scene.make.graphics();
		this.bgRoll.fillStyle(0xb23c17, 1);
		this.bgRoll.fillRoundedRect(
			hitArea.x,
			hitArea.y,
			hitArea.width,
			hitArea.height,
			16
		);
		this.bgRoll.setAlpha(0);

		this.setInteractive(
			{
				hitArea: hitArea,
				useHandCursor: true,
				hitAreaCallback: Phaser.Geom.Rectangle.Contains
			},
			Phaser.Geom.Rectangle.Contains
		);

		this.on('pointerover', this.onMouseOver);
		this.on('pointerout', this.onMouseOut);

		this.add(this.shadow);
		this.add(bg);
		this.add(this.bgRoll);
		this.add(this.button);
	}

	create() {
		//
	}

	onMouseOver() {
		this.scene.tweens.add({
			targets: this.bgRoll,
			alpha: { value: '1', duration: 100, ease: 'Cubic.easeOut' }
		});
	}
	onMouseOut() {
		this.scene.tweens.add({
			targets: this.bgRoll,
			alpha: { value: '0', duration: 25, ease: 'Cubic.easeOut' }
		});
	}
}
