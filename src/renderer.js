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


// let closeFlag = false;
// const myButton01 = document.getElementById('myButton01');
// myButton01.addEventListener('click', () => {
//     const childWindow = window.open('', 'modal')
//     if (closeFlag) {
//         closeFlag = false;
//         childWindow.close();
//     } else {
//         childWindow.document.write('<h1>Hello111</h1>')
//         closeFlag = true;
//     }
// });
//
// const myButton02 = document.getElementById('myButton02');
// myButton02.addEventListener('click', () => {
//     const childWindow = window.open('', 'modal')
//     if (closeFlag) {
//         closeFlag = false;
//         childWindow.close();
//     } else {
//         childWindow.document.write('<h1>Hello22</h1>')
//         closeFlag = true;
//     }
// });


const electron = require('electron');

const myButton01 = document.getElementById('myButton01');
myButton01.addEventListener('click', () => {

});
