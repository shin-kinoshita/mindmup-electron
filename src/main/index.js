import { app } from 'electron';
import setAppMenu from './setAppMenu';
import createWindowManager from './createWindowManager';
import showOpenFileDialog from './showOpenFileDialog';
import createFileManager from './createFileManager';
import showSaveAsNewFileDialog from './showSaveFileDialog';

let windowManager = null;
let fileManager = null;

function openFile() {
  showOpenFileDialog()
    .then((path) => {
      windowManager.setFocusedWindowPath(path);
      return fileManager.readMapJson(path);
    })
    .then((json) => windowManager.displayMap(json));
}

function saveAsNewFile() {
  Promise.all([showSaveAsNewFileDialog(), windowManager.fetchMap()])
    .then(([path, mapJson]) => fileManager.saveMapJson(path, mapJson));
}

function saveFile() {
  const path = windowManager.getFocusedWindowPath();
  if (path) {
    windowManager.fetchMap()
      .then((mapJson) => fileManager.saveMapJson(path, mapJson));
  } else {
    saveAsNewFile();
  }
}

function sendCommand(command, params) {
  windowManager.sendCommand(command, params);
}

app.on('ready', () => {
  fileManager = createFileManager();
  windowManager = createWindowManager();
  windowManager.addWindow();
  setAppMenu({ openFile, saveAsNewFile, saveFile, sendCommand });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    windowManager.addWindow();
  }
});
