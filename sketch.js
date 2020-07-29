const MAXLINES = 70;
const RESET = 2000;

let W, H;
let w0, w1, w2, w3;
let a0, a1, a2, a3;
let t = 0, hist = [];

function newParam() {
  w0 = random(-0.04, 0.04);
  w1 = random(-0.04, 0.04);
  w2 = random(-0.04, 0.04);
  w3 = random(-0.04, 0.04);
  a0 = random(TWO_PI);
  a1 = random(TWO_PI);
  a2 = random(TWO_PI);
  a3 = random(TWO_PI);
}

function mousePressed() {
  if (mouseX >= 10 && mouseY >= 10 && mouseX < width - 10 && mouseY < height - 10) {
    newParam();
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  W = width / 2;
  H = height / 2;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  W = width / 2;
  H = height / 2;
  strokeWeight(5);
  colorMode(HSB);
  newParam();
}

function draw() {
  hist.push({
    x0: W * cos(w0 * t + a0),
    y0: H * sin(w1 * t + a1),
    x1: W * cos(w2 * t + a2),
    y1: H * sin(w3 * t + a3),
    h: random(360)
  });
  if (hist.length > MAXLINES) {
    hist.splice(0, 1);
  }

  translate(W, H);
  scale(1, -1);
  background(0);
  
  for (let i = 0; i < hist.length; ++i) {
    const g = i / hist.length;  // lineair gradient
    const q = g * g;            // quadratic gradient
    stroke(hist[i].h, 100 * g, 100 * g, q);
    line(hist[i].x0, hist[i].y0, hist[i].x1, hist[i].y1);
  }
  
  if (++t == RESET) {
    t = 0;
    newParam();
  }
}
