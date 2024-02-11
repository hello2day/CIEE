// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

const fireworks = [];
let gravity;
let img;
function preload() {
  img = loadImage('Data/intan1.jpeg');
}

function setup() {
  createCanvas(500, 600);
  colorMode(RGB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}
function draw() {
  colorMode(RGB);
  image(img, 75, 320, 350, 150);
  background(0, 0, 0, 25);
  text('HAPPY NEW YORK KACK!', 2,150);
  text('WKWKWKWKWK', 70,210);
  textSize(40);
  stroke(random(90,2000));
  fill(random(10, 2000));
  
  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
