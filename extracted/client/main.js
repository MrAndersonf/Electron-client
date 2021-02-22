const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')



require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      //preload: path.join(app.getAppPath(), 'src/assets/javascript/renderer.js')
    }
  })

  win.loadFile('src/screens/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

let currentPath = '';

ipcMain.on('read-script-path', (event) => {
  dialog.showOpenDialog({
    defaultPath: `C:\\Users\\${process.env.USERNAME}\\Documents`,
    properties: ['openDirectory']
  }).then(result => {
    if (result.filePaths.length > 0) {
      currentPath = result.filePaths[0];
      event.reply('selected-script-file', currentPath)
    }
  }).catch(err => {
    event.reply('selected-script-file', false)
  })
})


ipcMain.on('read-executable-path', (event, name) => {
  dialog.showOpenDialog({
    defaultPath: path.resolve(__dirname + '/src/scripts/folders/' + name),
    properties: ['openFile']
  }).then(result => {
    if (result.filePaths.length > 0) {
      event.reply('selected-executable-file', result.filePaths[0])
    }
  }).catch(err => {
    console.log(err)
  })
})