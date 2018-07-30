import defaultColor from '../defaultColor';

class Square extends Phaser.GameObjects.Container {
  constructor ({ scene, xPos,yPos, size }) {   
   super(scene, xPos, yPos);
    
    this.size = size;

    this.isFilledIn = false
    this.isX = false;
    this.clicked = false;
    
    const hitArea = new Phaser.Geom.Rectangle(0,0,this.size, this.size);
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)

  }

  setBackground(color){
    const phaserColor = Phaser.Display.Color.GetColor(color.r,color.g,color.b);    
    let bmd = this.scene.make.graphics({x: 0, y: 0, add: false});    
    bmd.fillStyle(phaserColor, 0.5);
    bmd.fillRect(0, 0, this.size,this.size);
    this.add(bmd)
   

   
  }
  setId(id){
    this.id = id;    
  }

  updateState(data){   
      if(data==="x"){      
        this.setBackground(defaultColor);      
        let label =  this.scene.add.text(this.size/2, this.size/2-2, "x", {
            fontSize: this.size,
            color: '#ff0000',
            smoothed: false,
            fontFamily: 'Arial'
            })              
            label.setOrigin(0.5);         

            this.add(label);  

            
            this.isX = true;

     } else if(data!=0){
        this.setBackground(data);               
        this.isFilledIn = JSON.stringify(data) != JSON.stringify(defaultColor)
     } 
     //console.log("updated")

     
  }

  update () {
   
  }
}

export default Square;