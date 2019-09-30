class Population {
  constructor() {
    this.krills = [];
    this.populationSize = 500;
    this.matingPool = [];
    this.maxfit = 0;
    this.allCrashed = () => this.krills.filter(x => !x.crashed).length === 0;

    for(let i=0;i<this.populationSize;i++) {
      this.krills.push(new Krill());
    }

    this.tick = (counter) => {
      for(let i=0;i<this.krills.length;i++) {
        this.krills[i].tick(counter);
      }
    }

    this.evaluate = () => {
      this.maxfit = 0;
      for(let i=0;i<this.krills.length;i++) {
        this.krills[i].calculateFitness();
        if (this.krills[i].fitness > this.maxfit) {
          this.maxfit = this.krills[i].fitness;
        }
      }

      for(let i=0;i<this.krills.length;i++) {
        this.krills[i].fitness /= this.maxfit;
      }

      this.matingPool = [];
      for(let i=0;i<this.populationSize;i++) {
        const n = this.krills[i].fitness * 100;
        for(let j=0;j<n;j++) {
          this.matingPool.push(this.krills[i]);
        }
      }
    }

    this.selection = () => {
      let newPopulation = [];
      for(let i=0;i<this.krills.length;i++) {
        const p1 = random(this.matingPool).dna;
        const p2 = random(this.matingPool).dna;
        const child = p1.crossover(p2);
        child.mutate();
        newPopulation.push(new Krill(child));
      }
      this.krills = newPopulation;
    }

    this.update = () => {
      for(let i=0;i<this.krills.length;i++) {
        this.krills[i].update();
      }
    }

    this.draw = () => {
      for(let i=0;i<this.krills.length;i++) {
        this.krills[i].draw();
      }
    }
  }
}
