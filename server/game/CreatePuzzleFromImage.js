const Jimp = require('jimp');

const CreatePuzzleFromImage = filePath => {
	return Jimp.read(filePath)
		.then(function(image) {
			const puzzle = [];

			image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(
				x, // x, y is the position of this pixel on the image
				y,
				idx
			) {
				const r = this.bitmap.data[idx + 0];
				const g = this.bitmap.data[idx + 1];
				const b = this.bitmap.data[idx + 2];
				const a = this.bitmap.data[idx + 3];

				puzzle[y] = puzzle[y] || [];
				puzzle[y][x] = a === 255 ? { r, g, b, a } : 'x';
			});

			return puzzle;
		})
		.catch(function(err) {
			// handle an exception
			console.log(err); // eslint-disable-line
		});
};

module.exports = CreatePuzzleFromImage;
