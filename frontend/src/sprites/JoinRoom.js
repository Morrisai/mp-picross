import lang from '../lang';
import Phaser from 'phaser';
import queryString from 'query-string';
import Button from './Button';
import config from '../config';
import Swal from 'sweetalert2';

export default class extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, 0, 0);

		const room = queryString.parse(location.search).room;

		this.joinText = scene.add.text(0, 0, lang.text('joinRoom'), {
			font: `${55 / 20}em ${config.mainFont}`,
			fill: config.primaryColor,
			smoothed: true,
			padding: 10
		});

		this.errorText = scene.add.text(0, this.joinText.height + 10, '', {
			font: `${45 / 20}em ${config.mainFont}`,
			fill: config.primaryColor,
			smoothed: true,
			padding: 10
		});

		const joinButton = new Button(scene, 315 * 0.5, 95, lang.text('join'), 75);
		joinButton.on('pointerdown', this.onJoinPress, this);

		this.input = document.getElementById('room-input');
		this.input.value = (room || '').toUpperCase().trim();

		this.add(this.joinText);
		this.add(this.errorText);
		this.add(joinButton);

		this.setPosition(x, y);
	}

	onError(text) {
		this.input.value = '';

		Swal('Oops...', text, 'error');
	}

	onJoinPress() {
		if (this.input.value === '') {
			this.onError('Please provide a room ID');
		} else {
			this.emit('joinGame', this.scene, this.input.value.toUpperCase().trim());
		}
	}

	destroy() {
		this.input.style.visibility = 'hidden';
		super.destroy();
	}

	setPosition(x, y) {
		super.setPosition(x, y);

		if (this.input)
			this.input.style.cssText = `left: ${x +
				this.joinText.width +
				5}px; top: ${y + 2}px;visibility:visible;`;
	}
}
