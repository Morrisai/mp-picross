import lang from '../lang';

export default (game, x,y) => {
    const bannerText = lang.text('welcome')
    let banner = game.add.text(x, y, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
 
}

