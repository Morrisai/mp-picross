import Phaser from 'phaser';
class XState extends Phaser.GameObjects.Container {
	constructor(scene, xPos, yPos, maxX, numOfXs) {
		super(scene, xPos, yPos);

		this.maxX = maxX;
		this.Xs = [];

		for (let i = 0; i < maxX; i++) {
			this.Xs[i] = this.scene.add.text(i * 20, 0, 'X', {
				font: '20px Bangers',
				fill: '#333333',
				smoothed: true,
				padding: 0
			});

			this.add(this.Xs[i]);
		}

		this.setPosition(this.x - this.getBounds().width / 2, this.y);
		this.setXState(numOfXs);
	}

	setXState(currentNumOfXs) {
		const MaxMinusCurrent = this.maxX - currentNumOfXs;
		this.Xs.forEach((x, index) => {
			const color = index < MaxMinusCurrent ? '#E800FF' : '#333333';
			x.setColor(color);
		});
	}
}

export default XState;
