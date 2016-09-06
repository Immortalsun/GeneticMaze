class Individual{
    
    constructor(chromosomeLength,id,geneConstraint){
        this.chromosome = new Chromosome(chromosomeLength,geneConstraint);
        this.id = id;
        this.fitnessScore = 0;
        this.solveLine = undefined;
    }

    get Chromosome(){
        return this.chromosome;
    }

    get SolveLine(){
        if(this.solveLine == undefined){
            this.solveLine = new SolveLine();
        }

        return this.solveLine;
    }

    set Chromosome(chromosome){
        this.chromosome = chromosome;
    }

    get Id(){
        return this.id;
    }

    set Id(id){
        this.id = id;
    }

    get FitnessScore(){
        return this.fitnessScore;
    }

    set FitnessScore(score){
        this.fitnessScore = score;
    }

 AddVisitedNode(node){
        if(this.solveLine == undefined){
            this.solveLine = new SolveLine();
        }
        
        this.solveLine.AddNodeToVisited(node);
    }
}