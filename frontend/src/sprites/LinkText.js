import lang from '../lang';
export default (scene, x, y, roomId) => {
	let linkString =
		lang.text('link') +
		window.location.protocol +
		'/' +
		window.location.host +
		'/' +
		roomId;

	let banner = scene.add.text(x, y, linkString, {
		font: 35 / 20 + 'em Arial',
		fill: '#E800FF',
		smoothed: true,
		padding: 10
	});

	// banner.setPadding(10, 16)
	//banner.setOrigin(0.5);

	return banner;
};
