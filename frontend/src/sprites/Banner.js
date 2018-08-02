export default (scene, x, y, bannerText, size = 40, color= '#E800FF') => {
	let banner = scene.add.text(x, y, bannerText, {
		font: size / 20 + 'em Bangers',
		fill: color,
		smoothed: true,
		padding: 10
	});

	// banner.setPadding(10, 16)
	banner.setOrigin(0.5);

	return banner;
};
