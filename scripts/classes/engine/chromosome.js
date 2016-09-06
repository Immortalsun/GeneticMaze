class Chromosome{

    constructor(numGenes,geneConstraint){
        this.geneCount = numGenes;
        this.geneArray = [];
        this.GetRandomGenes(geneConstraint);
    }

    get GeneCount(){
        return this.geneCount;
    }

    get GeneArray(){
        return this.geneArray;
    }

    set GeneArray(genes){
        this.geneArray = genes;
    }

    CrossOver(otherChromosome){

    }

    Mutate(){
        
    }

    GetGeneAtIndex(i){
        if(i >= 0 && i< this.geneCount)
        {
            return this.geneArray[i];
        }
        return undefined;
    }

    GetRandomGenes(geneConstraint){
        for(i=0; i <this.geneCount; i++){
            this.geneArray[i] = Math.floor(Math.random() * geneConstraint);
        }
    }

}