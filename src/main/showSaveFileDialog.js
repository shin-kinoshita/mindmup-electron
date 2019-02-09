import { dialog } from 'electron';

function showSaveAsNewFileDialog() {
  return new Promise((resolve, reject) => {
    const file = dialog.showSaveDialog(
      {
        title: 'save',
        filters: [{ name: 'json file', extensions: [] }]
      }
    );
    if (file) {
      resolve(file);
    } else {
      reject();
    }
  });
}

export default showSaveAsNewFileDialog;
