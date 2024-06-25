const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');
const appPath = app.getAppPath();
let mainWindow;
let newWindow;

console.log('NODE_ENV:', process.env.NODE_ENV);

function getConfig() {
    const env = process.env.NODE_ENV || 'development';
    const configPath = path.join(appPath, `config/config.${env}.json`);
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

const config = getConfig();
console.log(config)

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createMainWindow = () => {
    //Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(appPath, 'favicon.ico'),
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
            disableHtmlFullscreenWindowResize: true
        },
    });
    // and load the index.html of the app.loadFile
    mainWindow.setMenu(null);
    // Open the DevTools.
    if(config.openDevToolsFlag){
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(r => {
        console.log('Loading ' + MAIN_WINDOW_WEBPACK_ENTRY + ' success');
    });
    ipcMain.on('create-or-reload-window', (event, windowParams) => {
        if (!newWindow) {
            newWindow = createWindow(windowParams);
            newWindow.webContents.once('did-finish-load', () => {
                console.log( windowParams.request);
                newWindow.webContents.send('init-data', windowParams.request);
            });
            newWindow.on('closed', () => {
                newWindow = null;
            });
        } else {
            newWindow.loadFile(path.join(appPath, windowParams.loadFile));
            if (newWindow.isMinimized()) newWindow.restore();
            newWindow.focus();
            newWindow.webContents.once('did-finish-load', () => {
                newWindow.webContents.send('init-data', windowParams.request);
            });
        }
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createMainWindow();
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.;
function createWindow(windowParams) {
    let options = windowParams.options;
    options['disableHtmlFullscreenWindowResize'] = true;
    options['preload'] = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;
    const window = new BrowserWindow({
        width: windowParams.width,
        height: windowParams.height,
        icon: path.join(appPath, 'favicon.ico'),
        webPreferences: options
    });
    // window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    //     callback({
    //         responseHeaders: {
    //             ...details.responseHeaders,
    //             'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' data: 'unsafe-eval'; connect-src 'self' https://super.ffzy-online6.com; media-src 'self' blob: https://svipsvip.ffzy-online6.com"]
    //         }
    //     });
    // });
    window.setMenu(null);
    if(config.openDevToolsFlag){
        mainWindow.webContents.openDevTools();
    }
    window.loadFile(path.join(appPath, windowParams.loadFile)).then(r => {
        console.log('Loading ' + path.join(appPath, windowParams.loadFile) + ' success');
    });
    // window.webContents.on('console-message', (event, level, message, line, sourceId) => {
    //     if (message.includes("Autofill.enable")) {
    //         event.preventDefault(); // 屏蔽错误消息
    //     }
    // });
    return window;
}