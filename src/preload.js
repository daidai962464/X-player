// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {contextBridge, ipcRenderer} = require('electron');

console.log('👋 This message is being logged by "preload.js", included via webpack');

contextBridge.exposeInMainWorld('electronApi', {
    createNewWindow: (windowParams) => ipcRenderer.send('create-or-reload-window', windowParams),
    onInitData: (callback) => ipcRenderer.on('init-data', (event, data) => callback(data)),
    getEnv: (key) => process.env[key]
});