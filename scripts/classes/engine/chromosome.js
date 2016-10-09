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
        var crossoverPoint = Math.floor(Math.random() * this.geneArray.length);
        for(var geneIdx = crossoverPoint; geneIdx < this.geneArray.length; geneIdx++){
            var tempGene = this.GetGeneAtIndex(geneIdx);
            this.geneArray[geneIdx] = otherChromosome.GetGeneAtIndex(geneIdx);
            otherChromosome.SetGeneAtIndex(geneIdx,tempGene);
        }
    }

    Mutate(){
        for(var i=0; i<this.geneCount; i++){
            var gene = this.GetGeneAtIndex(i);
            switch(gene){
                case 1:
                    this.SetGeneAtIndex(i,2);
                    break;
                case 2:
                    this.SetGeneAtIndex(i,1);
                    break;
                case 3:
                    this.SetGeneAtIndex(i,4);
                    break;
                case 4:
                    this.SetGeneAtIndex(i,3);
                    break;
            }
        }
    }

    GetGeneAtIndex(idx){
        if(idx >= 0 && idx< this.geneCount)
        {
            return this.geneArray[idx];
        }
        return undefined;
    }

    SetGeneAtIndex(idx, gene){
        if(idx >= 0 && idx < this.geneCount){
            this.geneArray[idx] = gene;
        }
    }

    GetRandomGenes(geneConstraint){
        for(var i=0; i <this.geneCount; i++){
            this.geneArray[i] = Math.floor(Math.random() * geneConstraint)+1;
        }
    }

}