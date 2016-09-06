class SolveLine
{
    constructor(){
        this.visitedNodes = [];
    }

    get VisitedNodes(){
        return this.visitedNodes;
    }

    AddNodeToVisited(node){
        this.visitedNodes.push(node);
    }
}