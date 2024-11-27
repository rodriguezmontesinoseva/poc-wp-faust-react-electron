
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });


  // Carga tu aplicación React
  mainWindow.loadURL('http://localhost:3000');


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

ipcMain.on('custom-function', () => {
  console.log('customFunction fue llamada desde el renderizador');
  // Realiza alguna acción, como abrir una ventana o enviar datos de vuelta
});

// app.commandLine.appendSwitch('ignore-certificate-errors'); //IGNORA TEMPORALMENTE EL PROBLEMA DEL CERTIFICADO