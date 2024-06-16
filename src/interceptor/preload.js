const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        send: function (channel, args) {
            return ipcRenderer.send(channel, args)
        },
        on: function (channel, args) {
            return ipcRenderer.on(channel, args)
        },
        once: function (channel, args) {
            return ipcRenderer.once(channel, args)
        }
    }
)