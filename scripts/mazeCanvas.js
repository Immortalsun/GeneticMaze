//DOM Objects
var _canvas = document.getElementById("MainCanvas");
var _drawContext = _canvas.getContext("2d");
var _currentMaze = undefined;
var _blockHeight = 25;
var _blockWidth = 75;
var _mazeStartX = 30;
var _mazeStartY = 30;

_canvas.width = _canvas.offsetWidth;
_canvas.height = _canvas.offsetHeight;

function DrawMaze(m,sizeX,sizeY){
    if(_currentMaze == undefined){
        _currentMaze = m;
    }
    else{
        _drawContext.clearRect(0,0,_canvas.width,_canvas.height);
        _currentMaze = m;
    }

    var currPoint = [_mazeStartX,_mazeStartY];
    var movedBlankWidth = false;
    var movedDashWidth = false;
    var blankCount = 0;
    _drawContext.moveTo(currPoint[0],currPoint[1]);
    _drawContext.strokeStyle = "#800000"
    _drawContext.fillStyle = "#800000";


    for(i=0; i<m.length; i++){
        var line = m[i];

        for(j=0; j< line.length; j++){
                switch(line.charAt(j)){
                    case '+':
                        _drawContext.beginPath();

                        _drawContext.closePath();
                        movedBlankWidth = false;
                        movedDashWidth = false;
                        break;

                    case '-':
                        if(!movedDashWidth){
                            _drawContext.moveTo(currPoint[0],currPoint[1]);
                            _drawContext.lineTo(currPoint[0]+_blockWidth,currPoint[1]);
                            _drawContext.stroke();
                            currPoint[0] += _blockWidth;
                            movedDashWidth = true;
                        }
                        break;

                    case '|':
                        _drawContext.moveTo(currPoint[0],currPoint[1]);
                        _drawContext.lineTo(currPoint[0],currPoint[1]+_blockHeight);
                        _drawContext.stroke(); 
                        movedBlankWidth = false;
                        movedDashWidth = false;
                        blankCount = 0;
                        break;
                    
                    case ' ':
                        if((i%2)){
                            if(blankCount == 0){
                                currPoint[0] += _blockWidth;
                            }
                            blankCount++;
                            if(blankCount >= 4){
                                blankCount = 0;
                            }
                        }
                        else if(!movedBlankWidth){
                            currPoint[0] += _blockWidth;
                            movedBlankWidth = true;
                        }
                        break;
                }
            
            }

            currPoint[0] = _mazeStartX;
            if(i%2){
                currPoint[1] += _blockHeight;
            }

            movedBlankWidth = false;
            movedDashWidth = false;
        }

}

