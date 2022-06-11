import path from 'path';
import { pathToFileDir } from '../pathToFileDir.js'

export const cdFunc = async (dirname, link) => {    
  try {
    const linkCommand = await pathToFileDir(dirname, link);    
    if (linkCommand.tail) throw Error('The command must include only one path_to_directory.');
    if (!!linkCommand.firstFile) throw Error(`\x1b[36m${linkCommand.firstFile}\x1b[35m is a file. \nThe path should only be to the folder path_to_directory.`);
    if (!linkCommand.firstDir) throw Error('The command must be followed by a path_to_directory.');      
    if (!!linkCommand.firstDir) return linkCommand.firstDir;        
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed.\n' + error.message + '\n\x1b[0m'); 
    return dirname;   
  } 
};
