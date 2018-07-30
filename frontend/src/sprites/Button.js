import Banner from '../sprites/Banner'

export default class extends Phaser.GameObjects.Container {
    constructor (scene,x,y , bannerText, size = 75) {      
      super(scene, x, y);

     
      this.button =  Banner(scene,0, 0, bannerText, size);
      this.add(this.button);
      
      const hitArea = new Phaser.Geom.Rectangle(-this.button.width/2,-this.button.height/2,this.button.width, this.button.height)

      
       this.setInteractive({hitArea:hitArea,useHandCursor:true,hitAreaCallback: Phaser.Geom.Rectangle.Contains }, Phaser.Geom.Rectangle.Contains);     
        
        


        this.on('pointerover', this.onMouseOver);
        this.on('pointerout', this.onMouseOut);
    }

    create(){
       // 
    }

    onMouseOver(){
        this.scene.tweens.add({
            targets: this.button,
            scaleY: { value: '0.95', duration: 100, ease: 'Cubic.easeOut' },
            scaleX: { value: '0.95', duration: 100, ease: 'Cubic.easeOut' }
        });

        
    }
    onMouseOut(){
        this.scene.tweens.add({
            targets: this.button,
            scaleY: { value: '1', duration: 100, ease: 'Cubic.easeOut' },
            scaleX: { value: '1', duration: 100, ease: 'Cubic.easeOut' }
        });
    }
}

