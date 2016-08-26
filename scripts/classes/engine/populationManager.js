class PopulationManager{

    constructor(){
        this.currentPopulation = [];
        this.newPopulation = [];
        this.crossoverRate = .7;
        this.genNum = 0;
        this.solutionFound = false;
        this.mutationRate = .001;
        this.populationCap = 25;
        this.solutionIndividual = undefined;
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

    get SolutionFound(){
        return this.solutionFound;
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

    RunGeneration(maze){
        TestPopulation(maze);
        if(!this.solutionFound){
            MatePopulation();
        }
    }

    RunGenerationsUntilFound(maze){
        while(!this.solutionFound){
            RunGeneration(maze);
        }

    }

    TestPopulation(maze){
        for(i =0; i<this.populationCap; i++){
            this.TestIndividualFitness(this.currentPopulation[i],maze);
        }
    }

    TestIndividualFitness(individual, maze){

    }


    MatePopulation(){
        this.genNum++;

        while(newPopulation.length < populationCap){

            var individualA = this.SelectIndividual();
            var individualB = this.SelectIndividual();
            var crossoverRoll = Math.floor(Math.random()*10)+1;
            var mutationRoll = Math.floor(Math.random()*1000)+1;
            var shouldMutate = (mutationRoll == 1);
            var shouldCrossover = false;

            if((crossoverRoll * .1) <= this.crossoverRate){
                shouldCrossover = true;
            }

            this.Mate(individualA,individualB,shouldMutate,shouldCrossover);

            if(newPopulation.length < populationCap){
                individualA.Id = "Gen"+this.genNum+":"+newPopulation.length;
                newPopulation.push(individualA);
                individualB.Id = "Gen"+this.genNum+":"+newPopulation.length;
                newPopulation.push(individualB);
            }
        }

        this.currentPopulation = this.newPopulation;
        this.newPopulation = [];
    }

    SelectIndividual(){

        var totalFitness = 0.0;
        for(i = 0; i<this.populationCap; i++) {
            totalFitness += this.currentPopulation[i].FitnessScore;
        }

        var fitnessSlice = Math.random()* totalFitness;

        var indivFitness = 0.0;
        for(j=0; j<this.populationCap; j++){
            var individual = this.currentPopulation[i];
            indivFitness += individual.FitnessScore;
            if(indivFitness >= fitnessSlice){
                this.currentPopulation.splice(j,1);
                return individual;
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
    }



    GetIndividualAtIndex(i){
        return this.currentPopulation[i];
    }


}