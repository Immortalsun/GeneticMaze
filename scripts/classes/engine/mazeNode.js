class MazeNode{

    constructor(){
        this.leftSib = undefined;
        this.rightSib = undefined;
        this.topSib = undefined;
        this.bottomSib = undefined;
        this.leftWallState = false;
        this.rightWallState = false;
        this.topWallState = false;
        this.bottomWallState = false;
        this.isStart = false;
        this.isEnd = false;
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

    get IsStart(){
        return this.isStart;
    }

    get IsEnd(){
        return this.isEnd;
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

    set IsStart(start){
        this.isStart = start;
    }

    set IsEnd(end){
        this.isEnd = end;
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