import { app } from 'electron';
import setAppMenu from './setAppMenu';
import createMainWindow from './createMainWindow';
import showOpenFileDialog from './showOpenFileDialog';
import createFileManager from './createFileManager';
import showSaveAsNewFileDialog from './showSaveFileDialog';

let mainWindow = null;
let fileManager = null;

function openFile() {
  showOpenFileDialog()
    .then((file) => fileManager.readMapJson(file))
    .then((json) => mainWindow.sendJson(json));
}

function saveAsNewFile() {
  Promise.all([showSaveAsNewFileDialog(), mainWindow.fetchMapJson()])
    .then(([file, mapJson]) => fileManager.saveMapJson(file, mapJson));
}

function sendCommand(command, params) {
  mainWindow.sendCommand(command, params);
}

function saveFile() {
  if (!fileManager.hasMapJsonPath()) {
    saveAsNewFile();
  } else {
    mainWindow.fetchMapJson()
      .then((mapJson) => fileManager.overwriteMapJson(mapJson));
  }
}

app.on('ready', () => {
  mainWindow = createMainWindow();
  fileManager = createFileManager();
  setAppMenu({ openFile, saveAsNewFile, saveFile, sendCommand });
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
