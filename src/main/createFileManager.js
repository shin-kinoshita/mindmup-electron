import fs from 'fs';

class FileManager {
  readFile(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;