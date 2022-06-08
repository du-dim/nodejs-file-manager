import fs from 'fs';
import path from 'path';

export const cdFunc = async (dirname, link) => {
  let currentPath;
  if (!path.isAbsolute(link)) {
    currentPath = path.join(dirname, link);    
  } else  {
    const firstDir = dirname.split(/[\\/]/)[0];
    const firstlink = link.split(/[\\/]/)[0];
    if (firstlink === firstDir) {
      currentPath = path.normalize(link);
    } else {
      currentPath = path.join(firstDir, link);
    }
  };  
  
  if (!fs.existsSync(currentPath)) {
    currentPath = dirname;
    process.stdout.write('Invalid input (invalid path)\n');
  }
  return currentPath;  
};


