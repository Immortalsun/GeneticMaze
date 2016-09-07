class PopulationManager{

    constructor(){
        this.currentPopulation = [];
        this.newPopulation = [];
        this.crossoverRate = .7;
        this.genNum = 0;
        this.solutionFound = false;
        this.mutationRate = .001;
        this.populationCap = 55;
        this.currentIndividual = undefined;
        this.currentIndividualIndex = 0;
        this.solutionIndividual = undefined;
        this.GenerateInitialPopulation();
    }

    static BuildManager(){
        return new PopulationManager();
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

    get GenerationNumber(){
        return this.genNum;
    }

    get CurrentIndividual(){
        return this.currentIndividual;
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
        for(var i=0; i<this.populationCap; i++){
            var index = i;
            this.currentPopulation[i] = new Individual(50,"Gen"+this.genNum+":"+index.toString(),5)
        }
    }

    RunGeneration(){
        if(MazeObject == undefined){
            throw "Maze is undefined";
        }

        this.currentIndividual = undefined;
        this.currentIndividualIndex = 0;

        this.TestPopulation();

        if(!this.solutionFound){
            this.MatePopulation();
        }
    }

    RunIndividual(){
        if(MazeObject == undefined){
            throw "Maze is undefined";
        }

        if(this.currentIndividualIndex < this.populationCap){
            this.currentIndividual = this.currentPopulation[this.currentIndividualIndex];
            this.TestIndividualFitness(this.currentIndividual);
            this.currentIndividualIndex++;
        }
    }

    RunGenerationsUntilFound(){
         if(MazeObject == undefined){
            throw "Maze is undefined";
        }
        while(!this.solutionFound){
            RunGeneration();
        }

    }

    TestPopulation(){
         if(MazeObject == undefined){
            throw "Maze is undefined";
        }
        var currentFitness = 0;
        for(var i =0; i<this.populationCap; i++){
            this.TestIndividualFitness(this.currentPopulation[i]);
            
            if(this.currentPopulation[i].FitnessScore > currentFitness){
                currentFitness = this.currentPopulation[i].FitnessScore;
                this.currentIndividual = this.currentPopulation[i];
                this.currentIndividualIndex = i;
            }
        }
    }

    TestIndividualFitness(individual){
        var maze = MazeObject;
        var currentNode = MazeObject[0][0];
        var cellIndex = [0,0];
        individual.AddVisitedNode(currentNode);
        for(var i=0; i<individual.Chromosome.GeneArray.length; i++){

            var gene = individual.Chromosome.GetGeneAtIndex(i);
            switch(gene){
                case 0: //0 means NO MOVE, the individual stays at its current Node
                    break;
                case 1: // 1 means MOVE UP, if the inidividual is at the start or there is a wall above it, nothing happens otherwise it moves to currentNode.TopSibling
                        if(!currentNode.IsStart && !currentNode.TopWallState && !currentNode.TopSibling.BottomWallState){
                            currentNode = currentNode.TopSibling;
                            cellIndex[0]--;
                            individual.AddVisitedNode(currentNode);
                        }

                        if(currentNode.IsEnd){
                            this.solutionFound = true;
                            this.solutionIndividual = individual;
                            break;
                        }
                    break;
                case 2: //2 means MOVE DOWN, if there is a wall below the individual, nothing happens, otherwise it moves to currentNode.BottomSibling
                        if(!currentNode.BottomWallState && !currentNode.BottomSibling.TopWallState){
                            currentNode = currentNode.BottomSibling;
                            cellIndex[0]++;
                             individual.AddVisitedNode(currentNode);
                        }

                        if(currentNode.IsEnd){
                            this.solutionFound = true;
                            this.solutionIndividual = individual;
                            break;
                        }
                    break;
                case 3: //3 means MOVE LEFT, if there is a wall to the left, nothing happens, otherwise it moves to currentNode.LeftSibilng
                        if(!currentNode.LeftWallState && !currentNode.LeftSibling.RightWallState){
                            currentNode = currentNode.LeftSibling;
                            cellIndex[1]--;
                            individual.AddVisitedNode(currentNode);
                        }

                        if(currentNode.IsEnd){
                            this.solutionFound = true;
                            this.solutionIndividual = individual;
                            break;
                        }
                    break;
                case 4: //4 means move RIGHT, if there is a wall to the right, nothing happens, otherwise it moves to currentNode.RightSibling
                        if(!currentNode.RightWallState && !currentNode.RightSibling.LeftWallState){
                            currentNode = currentNode.RightSibling;
                            cellIndex[1]++;
                            individual.AddVisitedNode(currentNode);
                        }

                        if(currentNode.IsEnd){
                            this.solutionFound = true;
                            this.solutionIndividual = individual;
                            break;
                        }
                    break;
            }
        }

        var endRow = MazeObject[MazeObject.length-1];
        var endNode = endRow[endRow.length-1];
        var maxScore = MazeObject.length - 1 + endRow.length - 1;
        if(endNode.IsEnd){
            var fitnessX = cellIndex[0];
            var fitnessY = cellIndex[1];
            var totalFitness = fitnessX + fitnessY;
            individual.FitnessScore = totalFitness/maxScore;
        }

    }


    MatePopulation(){
        this.genNum++;

        while(this.newPopulation.length < this.populationCap){

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

            if(this.newPopulation.length < this.populationCap){
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
        for(var i = 0; i<this.currentPopulation.length; i++) {
            totalFitness += this.currentPopulation[i].FitnessScore;
        }

        var fitnessSlice = Math.random()* totalFitness;

        var indivFitness = 0.0;
        for(var j=0; j<this.currentPopulation.length; j++){
            var individual = this.currentPopulation[j];
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