class MazeNode{

    constructor(){
        this.leftSib = undefined;
        this.rightSib = undefined;
        this.topSib = undefined;
        this.bottomSib = undefined;
        this.leftWallState = "0";
        this.rightWallState = "0";
        this.topWallState = "0";
        this.bottomWallState="0";
        this.isStartNode = false;
        this.isEndNode = false;
    }

    get LeftSibling(){
        return this.leftSib;
    }

    get RightSibling(){
        return this.rightSib;
    }

    get TopSibling(){
        return this.topSib;
    }

    get BottomSibling(){
        return this.bottomSib;
    }

    get LeftWallState(){
        return this.leftWallState;
    }

    get RightWallState(){
        return this.rightWallState;
    }

    get TopWallState(){
        return this.topWallState;
    }

    get BottomWallState(){
        return this.bottomWallState;
    }

    get IsStartNode(){
        return this.isStartNode;
    }

    get IsEndNode(){
        return this.isEndNode;
    }

    set LeftSibling(left){
        this.leftSib = left;
    }

    set RightSibling(right){
        this.rightSib = right;
    }

    set TopSibling(top){
        this.topSib = top;
    }

    set BottomSibling(bot){
        this.bottomSib = bot;
    }

    set IsStartNode(start){
        this.isStartNode = start;
    }

    set IsEndNode(end){
        this.isEndNode = end;
    }

    set TopWallState(topState){
        this.topWallState = topState;
    }

    set BottomWallState(botState){
        this.bottomWallState = botState;
    }

    set LeftWallState(leftstate){
        this.leftWallState = leftstate;
    }

    set RightWallState(rightState){
        this.rightWallState = rightState;
    }



}