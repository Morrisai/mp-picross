import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

export default {
  localStorageName: 'mp-picross',
  webfonts: ['Bangers'],
  type: Phaser.AUTO,
  pixelArt: true,
  roundPixels: true,
  parent: 'content',
  width: 800,
  height: 800,
  padding:200,
  scene: [
    BootState,
    SplashState,
    GameState
  ]
}
