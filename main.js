'use strict'

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const isDev = require('electron-is-dev');

const config = {};
config.devTools = true;
config.isDev = isDev;


function createWindow () {
    console.log("[MAIN.JS] Creating main window.");
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 600,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('src/html/index.html');
    mainWindow.setResizable(false);

    // Open the DevTools.
    if (config.isDev) {
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.setMenu(null);
    }
    
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow);
app.on('ready', function() {
    console.log("[MAIN.JS] App Event: ready triggered.");
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    console.log("[MAIN.JS] App Event: windows-all-closed triggered.");
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    console.log("[MAIN.JS] App Event: activate triggered.");
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});