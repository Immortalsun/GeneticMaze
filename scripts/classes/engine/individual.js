class Individual{
    
    constructor(chromosomeLength,id,geneConstraint){
        this.chromosome = new Chromosome(chromosomeLength,geneConstraint);
        this.id = id;
        this.fitnessScore = 0;
    }

    get Chromosome(){
        return this.chromosome;
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


}