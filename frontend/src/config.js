import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import GameOver from './states/GameOver'

export default {
  localStorageName: 'mp-picross',
  webfonts: ['Bangers'],
  type: Phaser.AUTO,
  pixelArt: true,
  roundPixels: true,
  parent: 'content',
  width: 800,
  height: 800,
  padding:300,
  scene: [
    BootState,
    SplashState,
    GameState,
    GameOver
  ]
}
