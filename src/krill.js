class Krill {
  constructor(dna) {
    this.pos = createVector(100, 100);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.fitness = 0;

    this.applyForce = force => {
      this.acc.add(force);
    }

    this.tick = (count) => {
      this.applyForce(this.dna.genes[count]);
    }

    this.calculateFitness = () => {
      const d = dist(this.pos.x, 0, target.x, 0)
      this.fitness = map(d, 0, width, width, 0);
      if (this.completed) {
        this.fitness *= 10;
      }
      if (this.crashed) {
        //this.fitness = 1;
      }
    }

    this.update = () => {
      const d = dist(this.pos.x, this.pos.y, target.x, target.y);
      if (d < 10) {
        this.completed = true;
        this.pos = target.copy();
      }

      if (this.pos.x < 0 || this.pos.x > width ||
        this.pos.y < 0 || this.pos.y > height) {
        this.crashed = true;
      }

      if (this.pos.x > obst1[0] && this.pos.x < obst1[0] + obst1[2] &&
         this.pos.y > obst1[1] && this.pos.y < obst1[1] + obst1[3]) {
        this.crashed = true;
      }

      if (this.pos.x > obst2[0] && this.pos.x < obst2[0] + obst2[2] &&
         this.pos.y > obst2[1] && this.pos.y < obst2[1] + obst2[3]) {
        this.crashed = true;
      }

      if (!this.completed && !this.crashed) {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
      }
    }

    this.draw = () => {
      push();
      fill(255, 150);
      translate(this.pos);
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 20, 4);
      fill(200, 150);
      rect(0, 0, 3, 12); // pootjes
      rect(-5, 0, 3, 12); // pootjes
      rect(-10, 0, 3, 12); // pootjes
      fill('#555');
      rect(10, 0, 8, 8); // pootjes
      pop();
    }
  }
}

class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for(let i=0;i<lifeSpan;i++) {
        this.genes.push(p5.Vector.random2D());
      }
    }

    this.crossover = (partner) => {
      let newGenes = [];
      let mid = floor(random(this.genes.length));
      for (let i =0;i<this.genes.length; i++) {
        if (i > mid) {
          newGenes.push(this.genes[i]);
        } else {
          newGenes.push(partner.genes[i]);
        }
      }
      return new DNA(newGenes);
    }

    this.mutate = () => {
      for (let i =0;i<this.genes.length; i++) {
        if (random(1) < 0.01) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(.1);
        }
      }
    };
  }
}
