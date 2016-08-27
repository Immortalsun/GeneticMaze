const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 1440, height: 900});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/interface.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

/////BUILD SCRIPT/////

//Imports
"use strict";
var fs = require('fs');

//Global Variables
var jsString = "";
var globalWriteDirectory = __dirname;
var outputFileName = "global.js"

//// ADD FILES TO BE CONCATENATED HERE ////
var filesInGlobalBuild = 
[
    //IMPORT FILE
    "/scripts/build/imports.js",

    //ENUMS
    //UTILS
    //GLOBAL VARABLES
    "/scripts/build/globalVariables.js",
    //CLASSES
    "/scripts/classes/maze.js",
    "/scripts/classes/solveLine.js",
    //END CLASSES
    //START EVENT HANDLERS
    "/scripts/mazeCanvas.js",
    "/scripts/events/controlButtonEvents.js",
    //END EVENT HANDLERS
    //START ENGINE FILES
    "/scripts/classes/engine/chromosome.js",
    "/scripts/classes/engine/individual.js",
    "/scripts/classes/engine/populationManager.js"
    //END ENGINE FILES
];
///////////////////////////////////////////

//Main
RunBuild();

//Methods
function RunBuild()
{    
    ConcatFiles(filesInGlobalBuild);
    WriteGlobalFile();
}

function ConcatFiles(filePathList) 
{
    for(var i = 0; i < filePathList.length; i++)
    {
        ConcatFile(filePathList[i]);
    }
    console.log("Finished Reading");
}

function ConcatFile(filePath)
{
    console.log("Trying Read - <"+ globalWriteDirectory + filePath +">");
    var fileString = fs.readFileSync(globalWriteDirectory + filePath,"utf8");
    jsString += "//START FILE: "+ filePath +"\n\n" 
        //+ "\"use strict\";" + "\n"
        + fileString 
        + "\n\n" + "//END FILE: "+ filePath +"\n\n";
        
    console.log("Completed Read - <"+ filePath +">");
}

function WriteGlobalFile()
{
    var writePath = globalWriteDirectory +"/"+ outputFileName;
    console.log("Trying Write - <"+ writePath +">");
    fs.writeFileSync(writePath, jsString, "utf8");
    console.log("Completed Full Write - <"+ writePath +">");
}

/////END BUILD SCRIPT/////