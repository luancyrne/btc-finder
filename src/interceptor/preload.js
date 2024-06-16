const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        send: function (channel, args) {
            return ipcRenderer.send(channel, args)
        }
    }
)