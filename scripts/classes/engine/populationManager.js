class PopulationManager{

    constructor(){
        this.currentPopulation = [];
        this.newPopulation = [];
        this.crossoverRate = .7;
        this.genNum = 0;
        this.mutationRate = .001;
        this.populationCap = 25;
        this.GenerateInitialPopulation();
    }

    get CrossoverRate(){
        return this.crossoverRate;
    }

    get MutationRate(){
        return this.mutationRate;
    }

    get PopulationCap(){
        return this.populationCap;
    }

    set CrossoverRate(rate){
        this.crossoverRate = rate;
    }

    set MutationRate(mutRate){
        this.mutationRate = mutRate;
    }

    set PopulationCap(cap){
        this.populationCap = cap;
    }

    GenerateInitialPopulation(){
        for(i=0; i<this.populationCap; i++){
            this.currentPopulation[i] = new Individual(30,"Gen"+this.genNum+":"+i,5)
        }
    }

    TestPopulation(maze){

    }

    TestIndividualFitness(individual, maze){

    }


    MatePopulation(){
        this.genNum++;
        for(i=0; i< this.populationCap; i++){
            var individualA = this.currentPopulation[i];
            var randomIndex = Math.floor(Math.random()*this.populationCap);
            if(randomIndex < this.populationCap && randomIndex > 0){
                var individualB = this.currentPopulation[randomIndex];
                var crossoverRoll = Math.floor(Math.random()*10)+1;
                var mutationRoll = Math.floor(Math.random()*1000)+1;
                var shouldMutate = (mutationRoll == 1);
                var shouldCrossover = false;
                if((crossoverRoll * .1) <= this.crossoverRate){
                    shouldCrossover = true;
                }

                this.Mate(individualA,individualB,shouldMutate,shouldCrossover);
                if(newPopulation.length < populationCap){
                    individualA.Id += newPopulation.length;
                    newPopulation.push(individualA);
                    individualB.Id += newPopulation.length;
                    newPopulation.push(individualB);
                }
            }
        }
    }

    Mate(individualA, individualB, shouldMutate, shouldCrossover){
        var chromosomeA = individualA.Chromosome;
        var chromosomeB = individualB.Chromosome;

        if(shouldCrossover){
            chromosomeA.CrossOver(chromosomeB);
        }

        if(shouldMutate){
            chromosomeA.Mutate();
            chromosomeB.Mutate();
        }

        individualA.Id = "Gen"+this.genNum+":";
        individualB.Id = "Gen"+this.genNum+":";
    }



    GetIndividualAtIndex(i){
        return this.currentPopulation[i];
    }


}