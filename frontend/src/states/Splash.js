import { centerGameObjects } from '../utils'

class Splash extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'SplashScene'
    });
}


  init () {}

  preload () {
    
  }

  create () {
    this.scene.start('GameScene');
  }
}

export default Splash;