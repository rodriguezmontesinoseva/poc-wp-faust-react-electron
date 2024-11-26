const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // contextIsolation: true,
      //  nodeIntegration: true,
    },
  });

        //    // Carga la aplicación Faust (Next.js)
        //    const appURL = process.env.NODE_ENV === 'development'
        //    ? 'http://localhost:3000' // Faust usa este puerto por defecto
        //    : `file://${path.join(__dirname, 'out/index.html')}`;
       
        //  mainWindow.loadURL(appURL);

  // Carga tu aplicación React
  mainWindow.loadURL('http://localhost:3000');

  // // Abre herramientas de desarrollo
  //  mainWindow.webContents.openDevTools();

//   mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
//   details.requestHeaders["Origin"] = "http://localhost";
//   callback({ cancel: false, requestHeaders: details.requestHeaders });
// });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});