class Flag {
  constructor(tempX, tempY){
    this.x = tempX;
    this.y = tempY;
    this.s = 16;
  }
  
  display(){
    imageMode(CENTER);
    image(flagImg, this.x, this.y)
  }
  
  addTime(objectX, objectY){
    let d = dist(this.x, this.y, objectX, objectY);
    
    if (d < this.s/2){
      timer += 0.25;
      //console.log("picked up flag");
    }
    
  }
}