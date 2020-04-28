const { app, BrowserWindow } = require('electron')

const init = () => {
  const browserWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  })
  browserWindow.on('ready-to-show', () => {
    browserWindow.show()
  })
  browserWindow.loadFile('./dist/index.html')
}
app.whenReady().then(init)