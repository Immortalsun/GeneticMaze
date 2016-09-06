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

    GetGeneAtIndex(idx){
        if(idx >= 0 && idx< this.geneCount)
        {
            return this.geneArray[idx];
        }
        return undefined;
    }

    GetRandomGenes(geneConstraint){
        for(var i=0; i <this.geneCount; i++){
            this.geneArray[i] = Math.floor(Math.random() * geneConstraint);
        }
    }

}