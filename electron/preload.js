const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload.js cargado'); 

contextBridge.exposeInMainWorld('electronAPI', {
  customFunction: () => {
    console.log('customFunction llamada desde el renderizador'); 
    ipcRenderer.send('custom-function');
  },
});
