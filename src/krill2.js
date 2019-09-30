class Krill {
  constructor(x, y, maxDNA, dna) {
    this.pos = [x, y];
    this.lifeCounter = 0;
    if (dna === null) {
      this.dna = [];
      for(let i=0;i<maxDNA;i++) {
        this.dna.push([Math.random() * 2 - 1, Math.random() * 2 - 1]);
      }
    } else {
      this.dna = dna;
    }
    this.hasDNA = true;
    this.earlyDeath = false;
    this.fitness = 0;
    this.heading = createVector(this.dna[this.lifeCounter][0], this.dna[this.lifeCounter][1]).heading();
  }

  tick() {
    if (this.lifeCounter > this.dna.length - 1) {
      this.hasDNA = false;
    } else {
      const currentDNA = this.dna[this.lifeCounter];
      this.pos[0] += currentDNA[0] * 10;
      this.pos[1] += currentDNA[1] * 10;
      this.heading = createVector(currentDNA[0], currentDNA[1]).heading();
      const life = this.lifeCounter / this.dna.length;
      let xx = this.pos[0];
      let yy = this.pos[1];
      const dist = Math.sqrt(xx * xx + yy * yy) / 100;
      const dist2 = Math.sqrt((windowWidth - xx ) * (windowWidth - xx) + (windowHeight - yy) * (windowHeight - yy));
      this.fitness = this.sigmoid(dist + 1 / dist2);
      if (this.earlyDeath) {
        this.fitness = 0;
      }
      this.lifeCounter++;
    }
  }

  sigmoid(value) {
    return 1 / (1 + Math.exp(-value));
  }
}
