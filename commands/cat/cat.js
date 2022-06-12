import fs from 'fs';
import { pathToFileDir } from '../pathToFileDir.js'

export const catFunc = async (dirname, link) => {
  try {
    const linkCommand = await pathToFileDir(dirname, link);      
    if (linkCommand.tail) throw Error('The command must include only one path_to_file.');
    if (linkCommand.firstDir) throw Error(`\x1b[33m${linkCommand.firstDir}\x1b[35m is a directory. \nThe path should only be to the file path_to_file.`);
    if (!linkCommand.firstFile) throw Error('The command must be followed by a path_to_file.');      
    if (linkCommand.firstFile) {
      const myReadStream = fs.createReadStream(linkCommand.firstFile, 'utf8');
      process.stdout.write(`\n\x1b[36mPrint file: \x1b[4m\x1b[33m${linkCommand.firstFile}\n\x1b[0m`);
      for await (const chunk of myReadStream) {
        process.stdout.write(chunk);
      }  
      process.stdout.write('\n');    
    };    
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed.\n' + error.message + '\n\x1b[0m');      
  } 
};
