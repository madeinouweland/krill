const updateInterval = 1000; // will update the game every second
let lastTime;
let deltaTime = 0;
let points = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  lastTime = millis();
}

// p5 draw function will be called every frame
function draw() {
  background("#528EC7");

  let time = millis();
  deltaTime += time - lastTime;
  if (deltaTime > updateInterval) {
    deltaTime = 0;
    update();
  }
  lastTime = time;

  text(points, 50, 50);
}

// update function will be called every 'updateInterval' milliseconds.
function update() {
  points++;
}
