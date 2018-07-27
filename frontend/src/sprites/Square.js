class Square extends Phaser.GameObjects.Container {
  constructor ({ scene, size,xPos,yPos }) {   
   super(scene, xPos, yPos);
    
    this.size = size;
    this.xPos = xPos;
    this.yPos = yPos;
    
    const hitArea = new Phaser.Geom.Rectangle(0,0,this.size, this.size)
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)

  }

  setBackground(color){
    let bmd = this.scene.make.graphics({x: 0, y: 0, add: false});    
    bmd.fillStyle(color, 1);
    bmd.fillRect(0, 0, this.size,this.size);
   

    this.add(bmd)
   

   
  }
  setId(id){
    this.id = id;    
  }

  updateState(data){
    
      if(data==="x"){      
        this.setBackground(0xffffff);      
        let label =  this.scene.add.text(this.size/2, this.size/2-2, "x", {
            fontSize: this.size,
            color: '#ff0000',
            smoothed: false,
            fontFamily: 'Arial'
            })              
            label.setOrigin(0.5);         

            this.add(label);  

     } else if(data!=0){
        this.setBackground(data);
     } else if(data===0) {
        this.setBackground(0xffffff);
     }
  }

  update () {
   
  }
}

export default Square;