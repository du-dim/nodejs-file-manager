import fs from 'fs';
import { cdFunc } from '../commands.js';

export const catFunc = async (dirname, link) => {
  const currentPath = await cdFunc(dirname, link);
  const myReadStream = fs.createReadStream(currentPath, 'utf8'); 
  process.stdout.write(`\n\x1b[36mPrint file: \x1b[4m\x1b[33m${currentPath}\n\x1b[0m`); 
  for await (const chunk of myReadStream) {
    process.stdout.write(chunk);
  } 
  myReadStream.on('error', (error) => {
    process.stdout.write('\x1b[35mOperation failed\n' + error.message + '\n\x1b[0m');    
  });  
};
