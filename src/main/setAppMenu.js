import { app, Menu, BrowserWindow } from 'electron';

function setAppMenu(options) {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => options.openFile() },
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
        { label: 'Sibling node', accelerator: 'Return', click: () => options.sendCommand('addSiblingIdea', ['keyboard']) },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy'},
        {label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste'},
        {label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut'},
        {label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall'},
      ],
    },
    {
      label: 'View',
      submenu: [
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
