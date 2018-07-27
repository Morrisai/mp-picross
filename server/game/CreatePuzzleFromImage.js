const Jimp = require("jimp");


const CreatePuzzleFromImage = (filePath, size)=>{
         
     return Jimp.read(filePath).then(function (image) {
            const puzzle = [];

            //image.resize(size, size)           
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y,idx) {
                // x, y is the position of this pixel on the image                             

                const r   = this.bitmap.data[ idx + 0 ];
                const g = this.bitmap.data[ idx + 1 ];
                const b  = this.bitmap.data[ idx + 2 ];
                const a = this.bitmap.data[ idx + 3 ];
                


                puzzle[y] = puzzle[y] || [];
                puzzle[y][x] = {r, g, b, a} ;              
              // console.log (puzzle[y][x]);

               
            })
           
            return puzzle
        }).catch(function (err) {
            // handle an exception
            console.log(err)
        });
   
}

module.exports = CreatePuzzleFromImage;