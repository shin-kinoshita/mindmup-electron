import { BrowserWindow, ipcMain } from 'electron';

class WindowManager {
  getFocusedWindow() {
    return BrowserWindow.getFocusedWindow();
  }
  setFocusedWindowPath(path) {
    this.getFocusedWindow().setRepresentedFilename(path);
  }
  getFocusedWindowPath() {
    return this.getFocusedWindow().getRepresentedFilename();
  }
  addWindow() {
    let window = new BrowserWindow({ width: 800, height: 600 });
    window.loadURL(`file://${__dirname}/../../index.html`);
    window.on('closed', () => {
      window = null;
    });
    return window;
  }
  addTab() {
    this.getFocusedWindow().addTabbedWindow(this.addWindow());
  }
  displayMap(json) {
    this.getFocusedWindow().webContents.send('SEND_MAP_JSON', json);
  }
  fetchMap() {
    return new Promise((resolve) => {
      this.getFocusedWindow().webContents.send('REQUEST_MAP_JSON');
      ipcMain.once('RETURN_MAP_JSON', (_e, mapJson) => resolve(mapJson));
    });
  }
  sendCommand(command, params) {
    this.getFocusedWindow().webContents.send('SEND_COMMAND', { command, params });
  }
}

function createWindowManager() {
  return new WindowManager();
}

export default createWindowManager;
