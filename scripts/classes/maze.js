var _internalMaze = [];

///THIS CODE WAS PULLED FROM THE WEB, I DID NOT WRITE IT
//That being said, I should probably figure out exactly how it works, but that is not the focus
//of this project
function BuildMaze(x,y){
    var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
	    verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
	    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	    path = [here],
	    unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}

	var maze = {x: x, y: y, horiz: horiz, verti: verti};
	GenerateMazeText(maze);
}

function GenerateMazeText(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= '+';
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= ' ';
					else
						line[k]= '-';
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= ' ';
					else
						line[k]= '|';
				else
					line[k]= ' ';
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		if (m.x*2-1 == j) line[4*m.y]= ' ';
		text.push(line.join('')+'\r\n');
	}
	//this method call was added by me to build the in-memory structure
	BuildMazeBlocks(text);
	return text;
}
///END SCARFED CODE

///This method builds the in-memory maze from the text output produced by the above code
function BuildMazeBlocks(mazeText){
	//each maze block has a width of 4 characters, so moving throgh 
	//3 text lines simultaneously should allow you to build each block
	if(_internalMaze.length > 0){
		_internalMaze = [];
	}
	//line for the top edge of the blocks
	var topLine = "";
	//line for the middle (walls)
	var midLine = "";
	//line for the bottom edge
	var bottomLine = "";

	for(i=0; i< mazeText.length; i++){

		//the top line should only be blank on the first iteration
		if(topLine == ""){
			topLine = mazeText[i];
		}
		else if(midLine == ""){
			midLine = mazeText[i];
		}
		else if(bottomLine == ""){
			bottomLine = mazeText[i];
		}

		//if i is not 0 and i mod 2 is 0 then we are on an even numbered array index
		//we need to use the collected lines to translate into an in-memory maze
		if(i != 0 && (i%2 == 0)){
			//the start of the maze ends at array index 2
			var isStart = (i == 2);
			//the end of the maze ends at the end of the array
			var isEnd = (i == mazeText.length - 1)
			//build a row for the maze (itself an array of nodes) and push it into the internal collection
			_internalMaze.push(BuildMazeRow(topLine,midLine,bottomLine, isStart, isEnd));
			//store the bottom line in a temporary location
			var tempBottom = bottomLine;
			//the top line for the next set of cells is the bottom line for the previous set (this is why the mod 2 is happening)
			topLine = tempBottom;
			//reset the last two lines
			bottomLine = "";
			midLine = "";
		}
	}

	SetUpMazeSiblings();
}

///This method builds a single row of the maze to be added to the internal collection
function BuildMazeRow(topLine, midLine, botLine, isStart, isEnd){
	var lineCounter = 0;
	var mazeRow = [];
	var startSeen = false;
	var endSeen  = false;
	while(lineCounter < topLine.length){
		//create a new maze node
		var mazeNode = new MazeNode();
		//horizontal block edges are always denoted by a +, so if the following characters
		//is a - (or not a space essentially) then we have a wall up top
		if(topLine.charAt(lineCounter+1) == "-"){
			mazeNode.TopWallState = true;
		}
		//if we see a | at the current line counter (index 0 for the block itself)
		//then we have a wall since vertical edges are not denoted with a +
		if(midLine.charAt(lineCounter) == "|"){
			mazeNode.LeftWallState = true;
		}

		//the width of a block is 4, so at index '3' (3 offset from wherever the line counter is)
		//if we see another | we have a right wall
		if(midLine.charAt(lineCounter+3) == "|"){
			mazeNode.RightWallState = true;
		}

		//the bottom line functions indentically to the top
		if(botLine.charAt(lineCounter+1)=="-"){
			mazeNode.BottomWallState = true;
		}

		//if we have a start node and have not already processed it, do so
		//same thing goes for the end node
		if(isStart && !startSeen){
			mazeNode.IsStart = true;
			startSeen = true;
		}
		else if(isEnd && !endSeen && lineCounter >= topLine.length-4){
			mazeNode.IsEnd = true;
			endSeen = true;
		}

		//add the completed node to the array
		mazeRow.push(mazeNode);
		//move our counter over a full block width
		lineCounter+= 4;
		
	}

	return mazeRow;
}

///This method sets up sibling references between nodes for easy traversal
function SetUpMazeSiblings(){
	if(_internalMaze.length == 0 || _internalMaze == undefined){
		return;
	}

	for(i = 0; i<_internalMaze.length; i++){
		var mazeRow = _internalMaze[i];
		for(j=0; j<mazeRow.length; j++){
			var mazeNode = mazeRow[j];

			if(j > 0){
				mazeNode.LeftSibling = mazeRow[j-1];
			}

			if(j+1 < mazeRow.length){
				mazeNode.RightSibling = mazeRow[j+1];
			}

			if(i > 0){
				var sibRowAbove = _internalMaze[i-1];
				mazeNode.TopSibling = sibRowAbove[j];
			}

			if(i+1 < _internalMaze.length){
				var sibRowBelow = _internalMaze[i+1];
				mazeNode.BottomSibling = sibRowBelow[j];
			}
		}
	}

	MazeObject = _internalMaze;

}