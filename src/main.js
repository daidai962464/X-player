const {electron, app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // icon: path.join(__dirname, './favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            // webSecurity: false,
            // preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            contextIsolation: false
        },
    });
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.setMenu(null);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    //     callback({
    //         responseHeaders: {
    //             ...details.responseHeaders,
    //             'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' data: 'unsafe-eval'; connect-src 'self' https://super.ffzy-online6.com; media-src 'self' blob: https://svipsvip.ffzy-online6.com"]
    //         }
    //     });
    // });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.;