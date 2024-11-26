// const { contextBridge } = require('electron');
       
// contextBridge.exposeInMainWorld('electronAPI', {
//   sayHello: () => console.log('Hello from Electron!')
// });

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  customFunction: () => console.log('Desde Electron')
});