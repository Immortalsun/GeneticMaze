class Chromosome{

    constructor(numGenes,geneConstraint){
        this.geneCount = numGenes;
        this.geneArray = [];
        this.GetRandomGenes(geneConstraint);
    }

    get GeneCount(){
        return this.geneCount;
    }

    set GeneArray(genes){
        this.geneArray = genes;
    }

    GenerateGenes(){
        for(i=0; i<this.geneCount; i++)
        {
            
        }
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