document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#close').addEventListener('click', () => {
        ipcRenderer.send('close')
    })

    document.querySelector('#minimize').addEventListener('click', () => {
        ipcRenderer.send('minimize')
    })

    document.getElementById('zoomOut').addEventListener('click', () => {
        ipcRenderer.send('zoomOut')
        document.getElementById('zoomOut').style.display = 'none'
        document.getElementById('zoomIn').style.display = 'block'
    })

    document.getElementById('zoomIn').addEventListener('click', () => {
        ipcRenderer.send('zoomIn')
        document.getElementById('zoomIn').style.display = 'none'
        document.getElementById('zoomOut').style.display = 'block'
    })
})



