const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path');
require('./interceptor/api');


const createWindow = () => {
    const win = new BrowserWindow({
        icon: './src/ui/assets/images/icon.png',
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        frame: false,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, './interceptor/preload.js')
        },
        titleBarStyle: 'hidden',
        autoHideMenuBar: true
    })

    win.loadFile('./ui/index.html')

    ipcMain.on('close', () => {
        win.close()
    })

    ipcMain.on('minimize', () => {
        win.minimize()
    })

    ipcMain.on('zoomOut', () => {
        win.maximize()
    })

    ipcMain.on('zoomIn', () => {
        win.unmaximize()
    })
}


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})