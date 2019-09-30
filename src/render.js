// https://mycolor.space/?hex=%23005C91&sub=1
let lastTime;
const updateInterval = 100;
let deltaTime = 0;
const lifeSpan = 100;
let lifeCounter = 0;

let isRunning = true;
let target;

let obst1;
let obst2;

function keyPressed() {
  if (key === " ") {
    if (isRunning) {
      noLoop();
      isRunning = false;
    } else {
      loop();
      isRunning = true;
    }
  }
}

let population;

function setup() {
  target = createVector(windowWidth - 100, windowHeight - 50);
  let canvas = createCanvas(windowWidth, windowHeight);

  obst1 = [windowWidth / 3 - 20, 0, 40, windowHeight / 1.5];
  obst2 = [windowWidth / 1.5 - 20, windowHeight / 3, 40, windowHeight / 1.5];

  lastTime = millis();
  population = new Population();
}

function draw() {
  background("#528EC7");

  let time = millis();
  deltaTime += time - lastTime;
  if (deltaTime > updateInterval) {
    deltaTime = 0;
    update();
  }
  lastTime = time;

  drawField();
  population.update();
  population.draw();
  drawInfo();
}

function update() {
  lifeCounter++;
  if (lifeCounter == lifeSpan || population.allCrashed()) {
    lifeCounter = 0;
    population.evaluate();
    population.selection();
  }
  population.tick(lifeCounter);
}

function drawField() {
  fill(255, 150);
  noStroke();

  rect(obst1[0], obst1[1], obst1[2], obst1[3]);
  rect(obst2[0], obst2[1], obst2[2], obst2[3]);

  ellipse(target.x, target.y, 20, 20);
}

function drawInfo() {
  fill('#fff');
  text(`lifeCounter: ${lifeCounter} maxfit: ${population.maxfit} `, 50, 50);
}
