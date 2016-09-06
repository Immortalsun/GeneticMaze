var _generateMazeButton = document.getElementById("generateMazeButton");
var _solveMazeButton = document.getElementById("solveMazeButton");
var _runSingleGenButton = document.getElementById("runGenerationButton");
var _runIndividualButton = document.getElementById("runIndividualButton");
_generateMazeButton.onclick = function(e){
    BuildMaze(8,8);
    DrawMaze(MazeObject);
}

_solveMazeButton.onclick = function(e){

}

_runSingleGenButton.onclick = function(e){
    
}

_runIndividualButton.onclick = function(e){
    if(MazeObject == undefined || MazeObject.length == 0){
        return;
    }

    if(PopManager == undefined){
        PopManager = PopulationManager.BuildManager();
    }

    PopManager.RunIndividual();
    DisplayIndividualInfo();
}
