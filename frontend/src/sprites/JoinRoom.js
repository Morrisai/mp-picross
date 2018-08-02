import lang from '../lang';
import Phaser from 'phaser';
import queryString from 'query-string';
import Button from './Button';

export default class extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, 0, 0);

		const room = queryString.parse(location.search).room;

		if (room) {
			this.banner = scene.add.text(0, 0, lang.text('joinRoom'), {
				font: 55 / 20 + 'em Bangers',
				fill: '#E800FF',
				smoothed: true,
				padding: 10
			});

			const start = new Button(scene, 120, 65, lang.text('join'), 75);

			

			this.input = document.getElementById('room-input');
			this.input.value = room;

			this.add(this.banner);
			this.add(start);
		}

		// banner.setPadding(10, 16)
		//banner.setOrigin(0.5);

		this.setPosition(x, y);
	}

	setPosition(x, y) {
		super.setPosition(x, y);

		if (this.input)
			this.input.style.cssText = `left: ${x +
				this.banner.width +
				5}px; top: ${y + 2}px;visibility:visible;`;
	}
}
