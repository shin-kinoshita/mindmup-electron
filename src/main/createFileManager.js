import fs from 'fs';

class FileManager {
  readMapJson(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  saveMapJson(path, mapJson) {
    fs.writeFileSync(path, JSON.stringify(mapJson));
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;