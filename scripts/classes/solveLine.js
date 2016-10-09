class SolveLine
{
    constructor(){
        this.visitedNodes = [];
        this.backTracks = 0;
    }

    get VisitedNodes(){
        return this.visitedNodes;
    }

    get BackTracks(){
        return this.backTracks;
    }

    AddNodeToVisited(node){

        if(this.visitedNodes.includes(node)){
            this.backTracks++;
        }

        this.visitedNodes.push(node);
    }
}