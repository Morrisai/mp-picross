export default (scene, x, y, bannerText, size = 40) => {
	let banner = scene.add.text(x, y, bannerText, {
		font: size / 20 + 'em Bangers',
		fill: '#E800FF',
		smoothed: true,
		padding: 10
	});

	// banner.setPadding(10, 16)
	banner.setOrigin(0.5);

	return banner;
};
