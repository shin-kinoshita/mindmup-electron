import fs from 'fs';

class FileManager {
  hasMapJsonPath() {
    return this.mapJsonPath !== '';
  }
  readMapJson(path) {
    this.mapJsonPath = path;
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  saveMapJson(path, mapJson) {
    fs.writeFileSync(path, JSON.stringify(mapJson));
  }
  overwriteMapJson(mapJson) {
    fs.writeFileSync(this.mapJsonPath, JSON.stringify(mapJson));
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;