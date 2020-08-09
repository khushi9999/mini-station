const { app, BrowserWindow } = require('electron');
const path = require('path')
const glob = require('glob')
const url = require('url')
const dialog = require('electron').dialog;
const { ipcMain } = require('electron');
const elect = require('electron');
const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')
var w, h;
let win;
let event;
let winloader;


ipcMain.on('resize-me-please', (event, arg) => {
  win.setSize(400, 400);
})

app.on('ready', () => {
  createWindow();
})


function createWindow() {
  loadingWindow();
  console.log('Khushbu Patel');
  win = new BrowserWindow({ session: 'mainWin', width: 1280, height: 768, minWidth: 1280, minHeight: 768, maxWidth: 1920, maxHeight: 1080, show: false, icon: __dirname + './dist/tpg/assets/images/favicon.ico', })
  // win.webContents.session.clearStorageData();
  // win.setResizable(false);
  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, './dist/tpg/index.html'),

    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
 //  win.webContents.openDevTools()

  win.on('closed', () => {
    // winloader.close();
    win = null
  })

  win.once('ready-to-show', () => {
    winloader.close();
    win.show();
    // win.webContents.openDevTools();
  })

  win.on('resize', () => {
    console.log('window is resized');
  });


  win.on('maximize', () => {
    // win.setSize(1300,1500);
    // if (w > 1921  || h > 1081) {
    //   w = 1920;
    //   h = 1080;
    // }
    console.log('window is maximized');
  });

  win.on('restore', () => {
    // win.setSize(1600,1900);
    console.log('window is restored');
  });
}


function loadingWindow() {
  console.log('loading window called');
  winloader = new BrowserWindow({ width: 400, height: 405, useContentSize: true, center: true, movable: false, resizable: false, frame: false })
  //  win.openDevTools()
  // load the dist folder from Angular
  winloader.loadURL(url.format({
    pathname: path.join(__dirname, './dist/tpg/assets/splashscreen.html'),
    protocol: 'file:',
    slashes: true
  }))

  // winloader.webContents.openDevTools()
  
  winloader.on('close', function (event) {
    console.log('loading window closed');
    winloader.hide();
    event.preventDefault();
  })

}
//app.on('ready', createWindow)

// let displays = electron.screen.getAllDisplays()

app.on('window-all-closed', () => {
  if (confirm('do you want to exit')) {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  } else {
    event.preventDefault();
  }

})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', () => {
  let screen = elect.screen;
  var mainScreen = screen.getPrimaryDisplay();
  w = mainScreen.bounds.width;
  h = mainScreen.bounds.height;
  if (w > 1921 || h > 1081) {
    w = 1920;
    h = 1080;
  }
  console.log('output screen : width, height', w, h);
});

app.onbeforeunload = (e) => {
  e.returnValue = false;
  if (confirm('do you really want to close the app ?')) {
    win.destroy();
  }

  // Unlike usual browsers, in which a string should be returned and the user is
  // prompted to confirm the page unload, Electron gives developers more options.
  // Returning empty string or false would prevent the unloading now.
  // You can also use the dialog API to let the user confirm closing the application.

};