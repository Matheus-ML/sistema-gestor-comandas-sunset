const { app, BrowserWindow } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

function createWindow () {

  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true
  });

  let indexPath;

  if (app.isPackaged) {
    indexPath = path.join(process.resourcesPath, 'app.asar', 'dist', 'index.html');
  } else {
    indexPath = path.join(__dirname, 'dist', 'index.html');
  }

  win.loadURL(pathToFileURL(indexPath).href);
}

app.whenReady().then(createWindow);
