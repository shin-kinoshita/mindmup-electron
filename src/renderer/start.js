/*global require, document, window, console */
const MAPJS = require('mindmup-mapjs');
const jQuery = require('jquery');
const themeProvider = require('./theme');
const ThemeProcessor = require('mindmup-mapjs-layout').ThemeProcessor;
const content = require('mindmup-mapjs-model').content;
const ipcRenderer = require('electron').ipcRenderer;
const init = function () {
  'use strict';
  const container = jQuery('#container');
  const imageInsertController = new MAPJS.ImageInsertController('http://localhost:4999?u=');
  const mapModel = new MAPJS.MapModel(MAPJS.DOMRender.layoutCalculator, []);

  jQuery.fn.attachmentEditorWidget = function (mapModel) {
    return this.each(function () {
      mapModel.addEventListener('attachmentOpened', function (nodeId, attachment) {
        mapModel.setAttachment(
            'attachmentEditorWidget',
            nodeId, {
              contentType: 'text/html',
              content: window.prompt('attachment', attachment && attachment.content)
            }
            );
      });
    });
  };
  window.onerror = window.alert;


  jQuery('#themecss').themeCssWidget(themeProvider, new ThemeProcessor(), mapModel);
  container.domMapWidget(console, mapModel, false, imageInsertController);
  jQuery('body').mapToolbarWidget(mapModel);
  jQuery('body').attachmentEditorWidget(mapModel);
  mapModel.setIdea(content(require('./example-map.json')));


  jQuery('#linkEditWidget').linkEditWidget(mapModel);
  window.mapModel = mapModel;
  jQuery('.arrow').click(function () {
    jQuery(this).toggleClass('active');
  });
  imageInsertController.addEventListener('imageInsertError', function (reason) {
    console.log('image insert error', reason);
  });
  container.on('drop', function (e) {
    const dataTransfer = e.originalEvent.dataTransfer;
    e.stopPropagation();
    e.preventDefault();
    if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
      const fileInfo = dataTransfer.files[0];
      if (/\.mup$/.test(fileInfo.name)) {
        const oFReader = new window.FileReader();
        oFReader.onload = function (oFREvent) {
          mapModel.setIdea(content(JSON.parse(oFREvent.target.result)));
        };
        oFReader.readAsText(fileInfo, 'UTF-8');
      }
    }
  });
  ipcRenderer.on('SEND_MAP_JSON', (_e, json) => {
    mapModel.setIdea(content(json));
  });
  ipcRenderer.on('REQUEST_MAP_JSON', () => {
    ipcRenderer.send('RETURN_MAP_JSON', mapModel.getIdea())
  });
  ipcRenderer.on('SEND_COMMAND', (_e, payload) => {
    const { command, params } = payload;
    mapModel[command](...params);
  });
};
document.addEventListener('DOMContentLoaded', init);
