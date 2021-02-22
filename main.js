const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

// require("electron-reload")(__dirname, {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron"),
// });

delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  win.loadFile("screens/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("originDirectory", (event) => {
  dialog
    .showOpenDialog({
      defaultPath: `C:\\Users\\${process.env.USERNAME}\\Documents`,
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.filePaths.length > 0) {
        currentPath = result.filePaths[0];
        event.reply("originDirectory-reply", currentPath);
      }
    })
    .catch((err) => {
      event.reply("originDirectory-reply", false);
    });
});

ipcMain.on("executableInDirectory", (event, name) => {
  dialog
    .showOpenDialog({
      defaultPath: `${name}`,
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.filePaths.length > 0) {
        event.reply("executableInDirectory-reply", result.filePaths[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
