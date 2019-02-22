import { app, Menu, BrowserWindow } from 'electron';

function setAppMenu(options) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => options.openFile() },
        { label: 'New Tab', accelerator: 'CmdOrCtrl+T', click: () => options.createNewTab() },
        { label: 'Close Tab', accelerator: 'CmdOrCtrl+W', click: () => options.closeTab() },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => options.saveFile() },
        { label: 'Save As...', click: () => options.saveAsNewFile() },
      ],
    },
    {
      label: 'Insert',
      submenu: [
        { label: 'Root node', accelerator: 'Cmd+D', click: () => options.sendCommand('insertRoot', ['keyboard']) },
        { label: 'Child node', accelerator: 'Tab', click: () => options.sendCommand('addSubIdea', ['keyboard']) },
        { label: 'Parent node', accelerator: 'Shift+Tab', click: () => options.sendCommand('insertIntermediate', ['keyboard']) },
        { label: 'Sibling node', click: () => options.sendCommand('addSiblingIdea', ['keyboard']) },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', click: () => options.sendCommand('undo', ['keyboard']) },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', click: () => options.sendCommand('redo', ['keyboard']) },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom in', accelerator: 'Z', click: () => options.sendCommand('scaleUp', ['keyboard']) },
        { label: 'Zoom out', accelerator: 'Shift+Z', click: () => options.sendCommand('scaleDown', ['keyboard']) },
        { label: 'Recenter view', accelerator: 'Cmd+0', click: () => options.sendCommand('resetView', ['keyboard']) },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
        },
      ],
    }
  ];
  if (process.platform === 'darwin') {
    template.unshift(
      {
        label: 'MarkdownEditor',
        submenu: [
          { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
        ],
      }
    );
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

export default setAppMenu;
