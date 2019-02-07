import { BrowserWindow, ipcMain } from 'electron';

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 800, height: 600 });
    this.window.loadURL(`file://${__dirname}/../../index.html`);
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  sendJson(json) {
    this.window.webContents.send('SEND_MAP_JSON', json);
  }
  fetchMapJson() {
    return new Promise((resolve) => {
      this.window.webContents.send('REQUEST_MAP_JSON');
      ipcMain.once('RETURN_MAP_JSON', (_e, mapJson) => resolve(mapJson));
    });
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;