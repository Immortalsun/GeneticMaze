class Individual{
    
    constructor(chromosomeLength,id,geneConstraint){
        this.chromosome = new Chromosome(chromosomeLength,geneConstraint);
        this.id = id;
    }

    get Chromosome(){
        return this.chromosome;
    }

    get Id(){
        return this.id;
    }

}