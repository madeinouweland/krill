//https://mycolor.space/?hex=%23005C91&sub=1

let krills = [];
const totalKrill = 50;
let pool = [];
const maxDNA = 100;
let generation = 1;
const updateInterval = 2;
let lastTime;
let averageDNAFitness = 0;
let deltaTime = 0;

let isRunning = true;

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

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  resize();
  textSize(20);
  angleMode(DEGREES);
  for(let i=0;i<totalKrill;i++) {
    krills.push(new Krill(gridCellSize * 7, gridCellSize * 7, maxDNA, null));
  }
  lastTime = millis();
}

function draw() {
  background("#528EC7");
  drawBorder();

  let time = millis();
  deltaTime += time - lastTime;
  if (deltaTime > updateInterval) {
    deltaTime = 0;
    update();
  }
  lastTime = time;

  for (k of krills) {
    if (!k.endOfLife) {
      drawKrill(k);
    }
  }

  drawInfo();
}

function update() {
  for (k of krills) {
    k.tick();
  }

  // check which krill should die
  for (k of krills) {
    if (isHittingWall(k)) {
      k.earlyDeath = true;
    }
  }

  // let dying krills die
  for (d of krills.filter(x => !x.hasDNA || x.earlyDeath)) {
    killKrill(d);
  }

  if (krills.length === 0) {
    for(let i=0;i<totalKrill;i++) {
      krills.push(createKrillFromPool());
    }

    pool = [];
  }
}

function createKrillFromPool() {
  const dna1 = getRandomItem(pool);
  const dna2 = getRandomItem(pool);
  const splitIndex = Math.floor(Math.random() * maxDNA) + 1;
  newDNA = [];
  for(let i=0; i<maxDNA; i++) {
    if (i<maxDNA-2) {
      newDNA.push([Math.random() * 2 - 1, Math.random() * 2 - 1]);
    }
    else if (i<splitIndex) {
      newDNA.push(dna1.dna[i]);
    } else {
      newDNA.push(dna2.dna[i]);
    }
  }

  newDNA = dna1.dna;
  return new Krill(gridCellSize * 7, gridCellSize * 7, maxDNA, newDNA);
}

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// calculate krills fitness
// store its DNA according the fitness
// take the krill out of the krills list
function killKrill(krill) {
  const fitness = krill.fitness;
  const addCount = Math.floor(fitness * 10);

  for(let i=0;i<addCount;i++) {
    pool.push({
      fitness: fitness,
      dna: krill.dna
    })
  }

  const total = pool.reduce((acc, item) => acc + item.fitness, 0);
  averageDNAFitness = total / pool.length;

  krills = krills.filter(x => x !== krill);
}






function isHittingWall(krill) {
  if (krill.pos[0] < gridCellSize || krill.pos[1] < gridCellSize
    || krill.pos[1] > windowHeight - gridCellSize || krill.pos[0] > windowWidth - gridCellSize) {
    return true;
  }
  if (krill.pos[0] > windowWidth / 3 - (gridCellSize / 2)
    && krill.pos[0] < windowWidth / 3 + (gridCellSize / 2) && krill.pos[1] < windowHeight / 1.5) {
    return true;
  }
  if (krill.pos[0] > windowWidth / 1.5 - (gridCellSize / 2)
    && krill.pos[0] < windowWidth / 1.5 + (gridCellSize / 2) && krill.pos[1] > windowHeight / 3) {
    return true;
  }
  return false;
}









function drawKrill(krill) {
  push();
  textSize(10);
  translate(krill.pos[0], krill.pos[1]);
  fill('#fff');
  //text(krill.fitness, 0, 0);
  rotate(krill.heading);
  fill("#FFE3E9");
  rect(-4, -4, 2, 8); // pootjes
  rect(0, -4, 2, 8); // pootjes
  rotate(- 90);
  fill("#C2FCF3");
  rect(-1, -6, 2, 12); // body
  fill("#FFCCFF");
  rect(-2, 6, 4, 4); // kop
  pop();
}

function drawBorder() {
  fill("#005C91");
  noStroke();
  rect(0, 0, windowWidth, gridCellSize);
  rect(0, windowHeight - gridCellSize, windowWidth, gridCellSize);
  rect(0, 0, gridCellSize, windowHeight);
  rect(windowWidth - gridCellSize, 0, gridCellSize, windowHeight);

  rect(windowWidth / 3, 0, gridCellSize, windowHeight / 1.5);
  rect(windowWidth / 1.5, windowHeight / 3, gridCellSize, windowHeight / 1.5);
  fill("#E09F20");
  rect(windowWidth - gridCellSize * 2, windowHeight - gridCellSize, gridCellSize, gridCellSize);
}

function drawInfo() {
  fill('#fff');
  text(`Krills: ${krills.length}, DNA-pool: ${pool.length}, Fitness: ${averageDNAFitness}`, 50, 50);
}
