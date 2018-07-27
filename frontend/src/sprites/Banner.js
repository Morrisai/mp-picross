import lang from '../lang';

export default (scene, x,y) => {
    const bannerText = lang.text('welcome')
    let banner = scene.add.text(x, y, bannerText, {
      font: '40px Bangers',
      fill: '#E800FF',
      smoothed: false
    })

   // banner.setPadding(10, 16)
    banner.setOrigin(0.5)

}

