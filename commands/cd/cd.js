import fs from 'fs';
import path from 'path';

let currentPath;
export const cdFunc = async (dirname, link) => {    
  currentPath = absolutePath(dirname, link);
  if (!fs.existsSync(currentPath)) {
    currentPath = dirname;
    process.stdout.write('\x1b[35mInvalid input (invalid path)\n\x1b[0m');
  }
  return currentPath;  
};

export const absolutePath = (dirname, link) => {
  if (!path.isAbsolute(link)) {
    return path.join(dirname, link);    
  } else  {
    const firstDir = dirname.split(/[\\\/]/)[0];
    const firstlink = link.split(/[\\\/]/)[0];
    if (firstlink === firstDir) {
      return path.normalize(link);
    } else {
      return path.join(firstDir, link);
    }
  };  
}


