class PopulationManager{

    constructor(){
        this.currentPopulation = [];
        this.crossoverRate = .7;
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
            this.currentPopulation[i] = new Individual(30,"Gen0"+":"+i,5)
        }
    }

    GetIndividualAtIndex(i){
        return this.currentPopulation[i];
    }


}