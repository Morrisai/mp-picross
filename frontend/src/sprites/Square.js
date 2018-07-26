import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game }) {
   
   super(game, 0, 0);


    this.inputEnabled = true;

   

    


  }

  setBackground(color){
    let bmd =  this.game.make.bitmapData(this.width, this.height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,64,64);
    bmd.ctx.fillStyle = color
    bmd.ctx.fill();
    this.setTexture(bmd.texture); 
  }

  updateState(data){
     if(data==="x"){      
        this.setBackground('#ffffff');

        let label =  this.game.add.text(0, 0, "x", {
            font: '40px',
            fill: '#ff0000',
            smoothed: false
            })    

            label.anchor.set(0.5);
            label.x = Math.floor( this.width / 2);
            label.y = Math.floor( this.height / 2);

            this.addChild(label);  


     } else if(data!=0){
        this.setBackground(data);
     } else if(data===0) {
        this.setBackground('#ffffff');
     }
  }

  update () {
   
  }
}
