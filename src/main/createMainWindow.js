import { BrowserWindow } from 'electron';

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 800, height: 600 });
    this.window.loadURL(`file://${__dirname}/../../index.html`);
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  sendJson(json) {
    this.window.webContents.send('SEND_JSON', json);
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;