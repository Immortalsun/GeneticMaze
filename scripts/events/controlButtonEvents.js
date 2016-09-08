var _generateMazeButton = document.getElementById("generateMazeButton");
var _solveMazeButton = document.getElementById("solveMazeButton");
var _runSingleGenButton = document.getElementById("runGenerationButton");
var _runIndividualButton = document.getElementById("runIndividualButton");
_generateMazeButton.onclick = function(e){
    BuildMaze(8,8);
    DrawMaze(MazeObject);

    if(PopManager != undefined){
        PopManager.Reset();
    }
}

_solveMazeButton.onclick = function(e){
    if(MazeObject == undefined || MazeObject.length == 0){
        return;
    }

    if(PopManager == undefined){
        PopManager = PopulationManager.BuildManager();
    }

    PopManager.RunGenerationsUntilFound();
}

_runSingleGenButton.onclick = function(e){
    if(MazeObject == undefined || MazeObject.length == 0){
        return;
    }

    if(PopManager == undefined){
        PopManager = PopulationManager.BuildManager();
    }

    PopManager.RunGeneration();
    DisplayIndividualInfo();
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
