import fs from 'fs';
import path from 'path';

export const addFunc = async (dirname, fileName) => {
  const currentPath = path.join(dirname, fileName);  
  try {
    if (fileName.search(/[\\\/\:\*\?\"\<\>\|]/) !== -1) throw Error('\x1b[35mCharacters «\x1b[36m\\\x1b[35m», «\x1b[36m/\x1b[35m», «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m')
    fs.open(currentPath, 'w', (err) => {
      if(err) throw Error(err.message);        
    });    
    process.stdout.write(`\x1b[32m${fileName}\x1b[36m was successfully created in \x1b[33m${dirname}\n\x1b[0m`);
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed\n' + error.message + '\n\x1b[0m');
  }      
}
