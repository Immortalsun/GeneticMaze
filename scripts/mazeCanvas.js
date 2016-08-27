//DOM Objects
var _canvas = document.getElementById("MainCanvas");
var _drawContext = _canvas.getContext("2d");

function DrawMaze(m){
    var pointStart = [10,10];
    var currPoint = pointStart;
    _drawContext.beginPath();
    _drawContext.moveTo(pointStart[0],pointStart[1]);
    _drawContext.strokeStyle = "#800000"
    for(i=0; i<m.length; i++){
        var line = m[i];

        for(j=0; j< line.length; j++){

            switch(line.charAt(i)){
                case '+':
                    _drawContext.lineTo(currPoint[0],currPoint[1]);
                    break;

            }

        }

    }
}
