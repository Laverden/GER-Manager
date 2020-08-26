'use strict'

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require('path');
const isDev = require('electron-is-dev');

const config = {};
config.devTools = true;
config.isDev = isDev;

var mainWindow = null;
var addWeaponWindow = null;

var isAddWeaponWindowOpen = false;

var skillListPayload = null;

function createWindow () {
  console.log('[MAIN.JS] Creating main window.');
  // Create the browser window.
  mainWindow = new BrowserWindow({
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

  mainWindow.webContents.on('new-window', (event, url, windowName) => {
    event.preventDefault();

    console.log('[MAIN.JS] On new window triggered...');

    var windowOptions = {};
    windowOptions.alwaysOnTop = false;
    windowOptions.fullscreen = false;
    windowOptions.show = false;
    windowOptions.resizable = false;

    if (windowName === 'add-weapon') {
      __addWeaponWindowInit(windowOptions);
      event.newGuest = addWeaponWindow;
    }
  });
}

function __addWeaponWindowInit (windowOptions) {
  windowOptions.width = 300;
  windowOptions.height = 500;
  windowOptions.modal = true;
  windowOptions.parent = mainWindow;
  windowOptions.webPreferences = { nodeIntegration: true };

  addWeaponWindow = new BrowserWindow(windowOptions);
  addWeaponWindow.loadURL('file://' + path.join(__dirname, '/src/html/add-weapon.html'));

  addWeaponWindow.once('ready-to-show', function () {
    setTimeout(function () {
      console.log('Loading settings window.....');
      addWeaponWindow.show();
      addWeaponWindow.webContents.send('populate-skills', skillListPayload);
      isAddWeaponWindowOpen = true;
    }, 500);
  });

  addWeaponWindow.on('closed', function (event) {
    isAddWeaponWindowOpen = false;
    addWeaponWindow = null;
    console.log('Closing settings window...');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow);
app.on('ready', function () {
  console.log('[MAIN.JS] App Event: ready triggered.');
  createWindow();

  ipcMain.on('new-weapon', function (event, obj) {
    mainWindow.webContents.send('add-weapon', obj);
    // mainWindow.reload();
  });

  ipcMain.on('update-skill-list', (event, data) => {
    skillListPayload = data;
  });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('[MAIN.JS] App Event: windows-all-closed triggered.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  console.log('[MAIN.JS] App Event: activate triggered.');
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
