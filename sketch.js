let state = 0;
let timer = 30;
let resetT = 30;
let points = 0
let resetP = 0
let flag = [];

//Things to add: Checkpoints that add points and time, a parameter that adds points when completing a lap, the final score after finishing a game

//Box1 Parameters
let x1 = 100;
let y1 = 100;
let w1 = 50;
let h1 = 50;

//Box2 Parameters
let x2 = 200;
let y2 = 100;
let w2 = 50;
let h2 = 50;

//Box3 Parameters
let x3 = 300;
let y3 = 100;
let w3 = 50;
let h3 = 50;

//Car Parameters
let trackImg, carImg;
let carX, carY, carAngle;
let carSpeed = 0;
const maxSpeed = 5;
const acceleration = 0.1;
const braking = 0.05;
const steering = 0.05;

function preload() {
  img1 = loadImage("trmm.png");
  img2 = loadImage("trcm.png");
  img3 = loadImage("trcrm.png");
  img4 = loadImage("trms.png");
  img5 = loadImage("bt.png");
  img6 = loadImage("at.png");
  img7 = loadImage("et.png");
  carImg = loadImage("redkart.png");
  flagImg = loadImage("cf.png");
}

function setup() {
  createCanvas(432, 238);
  background(0);
  textAlign(CENTER);
  fill(255);
  text("CLICK TO START", 100, 125, 200);
  
  carX1 = width / 1.155; //Map 1 Starting Position
  carY1 = height / 2;
  carX2 = width / 7.5; //Map 2 Starting Position
  carY2 = height / 1.5;
  carX3 = width / 2.5;//Map 3 Starting Position
  carY3 = height / 6.5;
  carAngle = 0; // Initial direction
  carAngle1 = 89.5; //Map 1 Direction
  carAngle2 = 180.65; //Map 2 Direction
}

function draw() {
  
  if (state == 1) {
    //Main Menu
    draw1();
  } else if (state == 2) {
    //Map Selection
    draw2();
  } else if (state == 3) {
    //Controls and Credits
    draw3();
  } else if (state == 4) {
    //Leaderboard
    draw4();
  } else if (state == 5) {
    //Beginner Map
    draw5();
  } else if (state == 6) {
    //Intermediate Map
    draw6();
  } else if (state == 7) {
    //Expert Map
    draw7();
  } else if (state == 8) {
    //End Screen
    draw8();
  }
  
}

function keyPressed() {

  if (state == 1 || state == 2 || state == 3 || state == 4){
  if (keyCode == 32) {
    //SPACE BAR
    state = 1;
  } else if (keyCode == 13) {
    //ENTER
    state = 2;
  } else if (keyCode == 67) {
    //C
    state = 3;
  } else if (keyCode == 86) {
    //V
    state = 4;
  }
}

if (state == 5 || state == 6 || state == 7 || state == 8){
  if (keyCode == 32) {
    //SPACE BAR
    state = 1;
  }
}
  
}

function mousePressed(){
  if (state == 0) {
    state = 1;
  }

  if (state == 2) {
    if ((mouseX > x1) && (mouseX < x1+w1) && (mouseY > y1) && (mouseY < y1+h1)) {
    state = 5;
  } else if ((mouseX > x2) && (mouseX < x2+w2) && (mouseY > y2) && (mouseY < y2+h2)) {
    state = 6;
  } else if ((mouseX > x3) && (mouseX < x3+w3) && (mouseY > y3) && (mouseY < y3+h3)) {
    state = 7;
  }
}
}

function draw1() {
  //main menu-have states that direct to controls and credits, leaderboard, and gameplay
  background(img1);
  fill(245, 229, 10);
  textSize(15);
  text("PRESS ENTER TO PLAY", 110, 122, 200);
  textSize(10);
  text("C FOR CONTROLS", 55, 165, 200);
  text("V FOR CREDITS", 170, 165, 200);
}

function draw2() {
  //map selection
  b1();
  b2();
  b3();
  background(img4);
  text("BEGINNER", 15, 160, 175);
  text("INTERMEDIATE", 108, 160, 200);
  text("EXPERT", 212, 160, 200);
  
}

function draw3() {
  //controls
  background(img2);
}

function draw4() {
  //credits
  background(img3);
  fill(0);
  text("WEB DESIGN", 30, 80, 100);
  text("INTERFACE", 70, 80, 200);
  text("GAMEPLAY", 150, 80, 200);
  text("MAP DESIGN", 240, 80, 200);
  text("NICK", 30, 100, 100);
  text("ALAN", 70, 100, 200);
  text("JAELEN", 150, 100, 200);
  text("ALL OF US", 240, 100, 200);
  text("THANK YOU FOR PLAYING TURBO RALLY", 216, 154);
}

function draw5() {
  //Beginner Level-once completed redirect to leaderboard
  background(img5);
  car1();
  countdown();
  text(timer, 380, 30);
  
  for (let i = 0; i < flag.length; i++) {
    flag[i].show();
    flag[i].overlap(carX1, carY1);
  }

  collectFlag();
  flagPlacement();
  score();
  //image(flagImg, width/2, height/2);
}

function draw6() {
  //Intermediate Level-once completed redirect to leaderboard
  background(img6);
  car2();
  countdown();
  text(timer, 40, 30);
}

function draw7() {
  //Expert Level-once completed redirect to leaderboard
  background(img7);
  car3();
  countdown();
  text(timer, 210, 130);
}

function draw8() {
  //End Screen when time is up
  background(150);
}

function car1() {
  // Handle car controls
  handleControlsMap1();

  // Update car position
  carX1 += cos(carAngle1) * carSpeed;
  carY1 += sin(carAngle1) * carSpeed;

  // Draw the car with rotation
  push();
  translate(carX1, carY1);
  rotate(carAngle1);
  imageMode(CENTER);
  image(carImg, 0, 0, 0, 0); // Adjust size as needed
  pop();
}

function car2() {
  // Handle car controls
  handleControlsMap2();

  // Update car position
  carX2 += cos(carAngle2) * carSpeed;
  carY2 += sin(carAngle2) * carSpeed;

  // Draw the car with rotation
  push();
  translate(carX2, carY2);
  rotate(carAngle2);
  imageMode(CENTER);
  image(carImg, 0, 0, 0, 0); // Adjust size as needed
  pop();
}

function car3() {
  // Handle car controls
  handleControls();

  // Update car position
  carX3 += cos(carAngle) * carSpeed;
  carY3 += sin(carAngle) * carSpeed;

  // Draw the car with rotation
  push();
  translate(carX3, carY3);
  rotate(carAngle);
  imageMode(CENTER);
  image(carImg, 0, 0, 0, 0); // Adjust size as needed
  pop();
}

function handleControls() {
  // Accelerate
  if (keyIsDown(UP_ARROW)) {
    carSpeed = min(carSpeed + acceleration, maxSpeed);
  }
  // Brake
  if (keyIsDown(DOWN_ARROW)) {
    carSpeed = max(carSpeed - braking, -maxSpeed / 2); // Allow reverse speed
  }
  // Steer left
  if (keyIsDown(LEFT_ARROW)) {
    carAngle -= steering;
  }
  // Steer right
  if (keyIsDown(RIGHT_ARROW)) {
    carAngle += steering;
  }

  // Apply friction to gradually slow down the car when no input is given
  carSpeed *= 0.98;
}

function handleControlsMap1() {
  // Accelerate
  if (keyIsDown(UP_ARROW)) {
    carSpeed = min(carSpeed + acceleration, maxSpeed);
  }
  // Brake
  if (keyIsDown(DOWN_ARROW)) {
    carSpeed = max(carSpeed - braking, -maxSpeed / 2); // Allow reverse speed
  }
  // Steer left
  if (keyIsDown(LEFT_ARROW)) {
    carAngle1 -= steering;
  }
  // Steer right
  if (keyIsDown(RIGHT_ARROW)) {
    carAngle1 += steering;
  }

  // Apply friction to gradually slow down the car when no input is given
  carSpeed *= 0.98;
}

function handleControlsMap2() {
  // Accelerate
  if (keyIsDown(UP_ARROW)) {
    carSpeed = min(carSpeed + acceleration, maxSpeed);
  }
  // Brake
  if (keyIsDown(DOWN_ARROW)) {
    carSpeed = max(carSpeed - braking, -maxSpeed / 2); // Allow reverse speed
  }
  // Steer left
  if (keyIsDown(LEFT_ARROW)) {
    carAngle2 -= steering;
  }
  // Steer right
  if (keyIsDown(RIGHT_ARROW)) {
    carAngle2 += steering;
  }

  // Apply friction to gradually slow down the car when no input is given
  carSpeed *= 0.98;
}

function b1() {
  fill(250);
  rect(x1, y1, w1 ,h1);
}

function b2() {
  fill(250);
  rect(x2, y2, w2 ,h2);
}

function b3() {
  fill(250);
  rect(x3, y3, w3 ,h3);
}

class Flag {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
  }
  
  show() {
    image(flagImg, this.x, this.y, this.r);
  }
  
  overlap(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < 25) {
      return true;
    } else {
      return false;
    }
  }
}

function collectFlag() {
  for (let i = 0; i < flag.length; i++) {
    if (flag[i].overlap(carX1, carY1)) {
      timer ++;
      points ++;
    }
  }
}

function flagPlacement() {
  if (timer > 0) {
    let flag = new Flag(random(width, height), random(height), 10, 10);
  }
}

function countdown() {
  textSize(25);
  fill('red');
  
  if (frameCount % 60 == 0 && timer > 0){
    timer --;
  }
  if (timer == 0) {
    state = 8;
    timer = resetT;
  }
}

function score() {
  textSize(25);
  fill('blue');
  text("SCORE ="+ points, 20, 20);
  
  points = points;
  
  if (timer == 0) {
    points = resetP;
  }
}
