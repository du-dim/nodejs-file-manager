import fs from "fs";
import path from "path";
import { absolutePath } from "../cd/cd.js";

const fsp = fs.promises;

export const rnFunc = async (dirname, addition) => {
  try {
    const parts = addition.split(/[\\\/]/);
    let pathDir = []; 
    let count = 0;
    for await (const dir of parts) {
      count++;      
      pathDir.push(dir);  
      const currentPath = absolutePath(dirname, path.join(pathDir.join('\\'))); 
      if (!fs.existsSync(currentPath) && parts.length === count) {    
        pathDir.pop(dir);      
        const newDirname = absolutePath(dirname, path.join(pathDir.join('\\')));      
        const partsFile = dir.split(' ');      
        const oldPathName = [];
        const newPathName = dir.split(' ');
        for await (const word of partsFile) {
          oldPathName.push(word.toString()); 
          newPathName.shift();
          const oldPathFile = path.join(newDirname, oldPathName.join(' ')); 
          if (fs.existsSync(oldPathFile)) {
            const newPathFile = path.join(newDirname, newPathName.join(' ')); 
            await fsp.rename(oldPathFile, newPathFile);
            process.stdout.write(`\x1b[32m${oldPathFile}\x1b[36m was successfully renamed to \x1b[32m${newPathFile}\n\x1b[0m`);
            return;          
          }               
        };        
      } 
    };
    throw new Error('File not found. \x1b[35mCharacters «\x1b[36m\\\x1b[35m», «\x1b[36m/\x1b[35m», «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m');    
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed\n' + error.message + '\n\x1b[0m');
  }
}