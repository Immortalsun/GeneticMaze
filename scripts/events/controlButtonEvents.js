var _generateMazeButton = document.getElementById("generateMazeButton");
var _solveMazeButton = document.getElementById("solveMazeButton");
var _runSingleGenButton = document.getElementById("runGenerationButton");

_generateMazeButton.onclick = function(e){
    var maze = BuildMaze(8,8);
    DrawMaze(GenerateMazeText(maze));
}

_solveMazeButton.onclick = function(e){

}

_runSingleGenButton.onclick = function(e){

}