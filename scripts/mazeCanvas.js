//DOM Objects
var _canvas = document.getElementById("MainCanvas");
var _drawContext = _canvas.getContext("2d");
var _currentMaze = undefined;
var _blockHeight = 25;
var _blockWidth = 75;
var _mazeStartX = 20;
var _mazeStartY = 20;
var _mazeHeight = 0;
var _mazeWidth = 0;

_canvas.width = _canvas.offsetWidth;
_canvas.height = _canvas.offsetHeight;

function DrawMaze(maze){
    if(_currentMaze == undefined){
        _currentMaze = maze;
    }
    else{
        _drawContext.clearRect(0,0,_canvas.width,_canvas.height);
        _currentMaze = maze;
    }
    var currPoint = [_mazeStartX,_mazeStartY];
    _drawContext.moveTo(currPoint[0],currPoint[1]);
    _drawContext.strokeStyle = "#800000"
    _drawContext.fillStyle = "#800000";

    for(i=0; i<maze.length; i++){
        var mazeRow = maze[i];

        if(_mazeHeight == 0){
            _mazeHeight = maze.length * _blockHeight;
        }

        for(j=0; j<mazeRow.length; j++){
            mazeNode = mazeRow[j];

            if(_mazeWidth == 0){
                _mazeWidth = mazeRow.length * _blockWidth;
            }

            if(mazeNode.TopWallState){
                _drawContext.beginPath();
                _drawContext.moveTo(currPoint[0],currPoint[1]);
                _drawContext.lineTo(currPoint[0]+_blockWidth,currPoint[1]);
                _drawContext.stroke();
                _drawContext.closePath();
            }

            if(mazeNode.LeftWallState){
                 _drawContext.beginPath();
                _drawContext.moveTo(currPoint[0],currPoint[1]);
                _drawContext.lineTo(currPoint[0],currPoint[1]+_blockHeight);
                _drawContext.stroke();
                _drawContext.closePath();
            }

            if(i+1 >= maze.length && mazeNode.BottomWallState){
                _drawContext.beginPath();
                _drawContext.moveTo(currPoint[0],currPoint[1]+_blockHeight);
                _drawContext.lineTo(currPoint[0]+_blockWidth,currPoint[1]+_blockHeight);
                _drawContext.stroke();
                _drawContext.closePath();
            }
            
            currPoint[0] += _blockWidth;
        }

        currPoint[0] = _mazeStartX;
        currPoint[1] += _blockHeight;
        
    }
}

function DrawMazeWithSolveLine(solveLine){
    if(_currentMaze == undefined){
        return;
    }
    var maze = _currentMaze;
    var currPoint = [_mazeStartX,_mazeStartY];
    _drawContext.moveTo(currPoint[0],currPoint[1]);
    _drawContext.strokeStyle = "#800000"
    _drawContext.fillStyle = "#800000";

    for(i=0; i<maze.length; i++){
        var mazeRow = maze[i];

        if(_mazeHeight == 0){
            _mazeHeight = maze.length * _blockHeight;
        }

        for(j=0; j<mazeRow.length; j++){
            mazeNode = mazeRow[j];

            if(_mazeWidth == 0){
                _mazeWidth = mazeRow.length * _blockWidth;
            }

            if(mazeNode.TopWallState){
                _drawContext.beginPath();
                _drawContext.moveTo(currPoint[0],currPoint[1]);
                _drawContext.lineTo(currPoint[0]+_blockWidth,currPoint[1]);
                _drawContext.stroke();
                _drawContext.closePath();
            }

            if(mazeNode.LeftWallState){
                 _drawContext.beginPath();
                _drawContext.moveTo(currPoint[0],currPoint[1]);
                _drawContext.lineTo(currPoint[0],currPoint[1]+_blockHeight);
                _drawContext.stroke();
                _drawContext.closePath();
            }

            if(i+1 >= maze.length && mazeNode.BottomWallState){
                _drawContext.beginPath();
                _drawContext.moveTo(currPoint[0],currPoint[1]+_blockHeight);
                _drawContext.lineTo(currPoint[0]+_blockWidth,currPoint[1]+_blockHeight);
                _drawContext.stroke();
                _drawContext.closePath();
            }

            if(solveLine.VisitedNodes.indexOf(mazeNode) >= 0){
                _drawContext.fillStyle = "#0099ff";
                _drawContext.beginPath();
                _drawContext.arc(currPoint[0]+(_blockWidth/2),currPoint[1]+(_blockHeight/2),5,0,2*Math.PI);
                _drawContext.fill();
                _drawContext.closePath();
                _drawContext.fillStyle = "#800000";
            }
            
            currPoint[0] += _blockWidth;
        }

        currPoint[0] = _mazeStartX;
        currPoint[1] += _blockHeight;
        
    }
}

function DisplayIndividualInfo(){
    if(PopManager == undefined || PopManager.CurrentIndividual == undefined){
        return;
    }
    _drawContext.clearRect(0,0,_canvas.width,_canvas.height);
    var individual = PopManager.CurrentIndividual;
    DrawMazeWithSolveLine(individual.SolveLine);
    var textPoint = [_mazeStartX + _mazeWidth + 10, _mazeStartY];
    _drawContext.font = "16px Arial";
    _drawContext.fillText("Generation: "+PopManager.GenerationNumber, textPoint[0], textPoint[1]);
    textPoint[1] += 18;
    _drawContext.fillText("Individual Id: "+individual.Id, textPoint[0], textPoint[1]);
    textPoint[1] += 18;
    _drawContext.fillText("Fitness Score: "+individual.FitnessScore, textPoint[0], textPoint[1]);    
}

