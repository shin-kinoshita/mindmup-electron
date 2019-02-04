import { app } from 'electron';
import setAppMenu from './setAppMenu';
import createMainWindow from './createMainWindow';
import showOpenFileDialog from './showOpenFileDialog';
import createFileManager from './createFileManager';

let mainWindow = null;
let fileManager = null;

function openFile() {
  showOpenFileDialog()
    .then((file) => fileManager.readFile(file))
    .then((json) => mainWindow.sendJson(json));
}

app.on('ready', () => {
  mainWindow = createMainWindow();
  fileManager = createFileManager();
  setAppMenu({ openFile });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = createMainWindow();
  }
});
