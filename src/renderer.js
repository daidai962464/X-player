/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const WindowParams = require('./windowParams');

const myButton01 = document.getElementById('myButton01');
myButton01.addEventListener('click', () => {
    let windowParams = new WindowParams(800, 600, 'src/newpage1.html', {
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
    }, {
        title: 'it is page1'
    });
    window.electronApi.createNewWindow(windowParams);
});

const myButton02 = document.getElementById('myButton02');
myButton02.addEventListener('click', () => {
    let windowParams = new WindowParams(800, 600, 'src/newpage2.html', {
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
    }, {
        title: 'it is page2'
    });
    window.electronApi.createNewWindow(windowParams);
});